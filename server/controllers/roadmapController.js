const Roadmap = require("../models/Roadmap");
const RoadmapProgress = require("../models/RoadmapProgress");
const RoadmapTask = require("../models/RoadmapTask");
const RoadmapWeek = require("../models/RoadmapWeek");
const User = require("../models/User");
const { generateRoadmapAI } = require("../services/aiService");
const updateStreak = require("../services/updateStreak");

const generateRoadmap = async (req, res) => {
  try {
    const { goal, level, hoursPerDay, weekNumber } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      goal === undefined ||
      level === undefined ||
      hoursPerDay === undefined ||
      weekNumber === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const now = new Date();
    const lastReset = new Date(user.roadmapResetDate);

    if (
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear()
    ) {
      user.roadmapGenerated = 0;
      user.roadmapResetDate = now;
      await user.save();
    }

    let maxLimit = 2;

    if (user.planType === "paid") {
      maxLimit = 10;
    }

    if (user.roadmapGenerated >= maxLimit) {
      return res.status(403).json({
        success: false,
        message: `You reached your monthly roadmap limit (${maxLimit}). Upgrade your plan.`,
      });
    }

    const existingRoadmap = await Roadmap.findOne({
      userId: req.user.userId,
      goal,
      skillLevel: level,
      dailyStudyTime: hoursPerDay,
    });

    if (existingRoadmap) {
      return res.status(400).json({
        success: false,
        message: "Roadmap already generated for this goal",
        roadmapId: existingRoadmap._id,
      });
    }

    const roadmap = await generateRoadmapAI({
      goal,
      level,
      hoursPerDay,
      weekNumber,
    });

    // console.dir(roadmap, { depth: null })
    const weeks = roadmap?.weeks;

    if (!weeks || !Array.isArray(weeks)) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI roadmap structure",
      });
    }

    const roadmapData = await Roadmap.create({
      userId: req.user.userId,
      goal,
      skillLevel: level,
      dailyStudyTime: hoursPerDay,
      durationWeeks: weekNumber,
      status: "active",
      aiRawResponse: JSON.stringify(roadmap),
      aiProvider: "gemini",
    });

    let totalTasks = 0;
    const taskBulkArr = [];

    for (const week of weeks) {
      const createdWeek = await RoadmapWeek.create({
        roadmapId: roadmapData._id,
        weekNumber: week.week,
        topics: week.topics,
        project: week.project,
      });

      // const createdWeek = await Promise.all(
      //   weeks.map((week) =>
      //     RoadmapWeek.create({
      //       roadmapId: roadmapData._id,
      //       weekNumber: week.week,
      //       topics: week.topics,
      //       project: week.project,
      //     }),
      //   ),
      // );

      if (week.daily_tasks && Array.isArray(week.daily_tasks)) {
        week.daily_tasks.forEach((task) => {
          taskBulkArr.push({
            roadmapId: roadmapData._id,
            weekId: createdWeek._id,
            taskTitle: task,
          });
          totalTasks++;
        });
      }
    }

    if (taskBulkArr.length > 0) {
      await RoadmapTask.insertMany(taskBulkArr);
    }

    //progress
    await RoadmapProgress.create({
      userId: req.user.userId,
      roadmapId: roadmapData._id,
      totalTasks: totalTasks,
      completedTasks: 0,
      progressPercent: 0,
    });

    user.roadmapGenerated += 1;
    await user.save();

    const remaining = maxLimit - user.roadmapGenerated;

    res.status(200).json({
      success: true,
      data: roadmapData,
      remainingRoadmaps: remaining,
      message: "Roadmap generated successfully!",
    });
  } catch (error) {
    console.error("Roadmap generation error:", error);
    res.status(500).json({
      success: false,
      message: "Roadmap generation failed",
    });
  }
};

const getRoadmapById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Roadmap id is required",
      });
    }

    // 1️⃣ Get roadmap
    const roadmap = await Roadmap.findById(id).select("-aiRawResponse");

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    // 2️⃣ Get weeks
    const weeks = await RoadmapWeek.find({ roadmapId: id })
      .sort({ weekNumber: 1 })
      .select("-createdAt -updatedAt")
      .lean();

    // 3️⃣ Attach tasks to each week
    await Promise.all(
      weeks.map(async (week) => {
        const tasks = await RoadmapTask.find({
          weekId: week._id,
        })
          .sort({ createdAt: 1 })
          .select("taskTitle isCompleted");

        week.tasks = tasks;
      }),
    );

    // 4️⃣ Get progress
    const progress = await RoadmapProgress.findOne({
      roadmapId: id,
    });

    res.status(200).json({
      success: true,
      data: {
        roadmap,
        weeks,
        progress,
      },
    });
  } catch (error) {
    console.error("Get roadmap error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const toggleTaskCompletion = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;
    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Task id is required" });
    }
    const task = await RoadmapTask.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }

    task.isCompleted = !task.isCompleted;
    task.completedAt = task.isCompleted ? new Date() : null;
    await task.save();

    const progress = await RoadmapProgress.findOne({
      roadmapId: task.roadmapId,
    });

    if (task.isCompleted) {
      progress.completedTasks += 1;
    } else {
      progress.completedTasks -= 1;
    }

    progress.progressPercent = Math.round(
      (progress.completedTasks / progress.totalTasks) * 100,
    );

    await progress.save();

    if (task.isCompleted) {
      const user = await User.findById(userId);
      updateStreak(user);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
      progress,
    });
  } catch (error) {
    console.error("Toggle task error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getProgreesForRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;
    if (!roadmapId) {
      return res
        .status(400)
        .json({ success: false, message: "Roadmap Id is required" });
    }

    const progress = await RoadmapProgress.findOne({ roadmapId });
    if (!progress) {
      return res
        .status(404)
        .json({ success: false, message: "Progress not found" });
    }

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error("Progress error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getWeekProgress = async (req, res) => {
  try {
    const { roadmapId, weekNumber } = req.params;
    if (!roadmapId || !weekNumber) {
      return res.status(400).json({
        success: false,
        message: "Roadmap Id and Week Id are required",
      });
    }

    const week = await RoadmapWeek.findOne({ roadmapId, weekNumber });
    if (!week) {
      return res.status(404).json({
        success: false,
        message: "Week not found",
      });
    }

    const tasks = await RoadmapTask.find({ weekId: week._id });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.isCompleted).length;
    const progressPercent = Math.round((completedTasks / totalTasks) * 100);

    res.status(200).json({
      success: true,
      weekNumber,
      totalTasks,
      completedTasks,
      progressPercent,
    });
  } catch (error) {
    console.error("Week progress error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getMyRoadMap = async (req, res) => {
  try {
    const { roadmapId } = req.params;
    if (!roadmapId) {
      return res
        .status(400)
        .json({ success: false, message: "Roadmap Id is required" });
    }

    const roadmap = await Roadmap.findById(roadmapId).select("-aiRawResponse");
    if (!roadmap) {
      return res
        .status(404)
        .json({ success: false, message: "Roadmap not found" });
    }

    res.status(200).json({ success: true, data: roadmap });
  } catch (error) {
    console.log("Error in getting roadmap", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("streak");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user.streak });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const dashBoardState = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required" });
    }

    const user = await User.findById(userId).select(
      "roadmapGenerated planType",
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const roadmapGenerated = user.roadmapGenerated;
    const planType = user.planType;

    const roadmap = await Roadmap.find({ userId });
    const progress = await RoadmapProgress.find({userId });
    // console.log(progress)
    if (!progress) {
      return res
        .status(404)
        .json({ success: false, message: "Progress not found" });
    }
    const totalRoadmaps = roadmap.length;
    const status = roadmap.status;
    const totalTask = progress.totalTasks;
    const completedTasks = progress.completedTasks;
    const progressPercent = progress.progressPercent;

    res
      .status(200)
      .json({
        success: true,
        data: {
          roadmapGenerated,
          planType,
          totalRoadmaps,
          status,
          totalTask,
          completedTasks,
          progressPercent,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  generateRoadmap,
  getRoadmapById,
  toggleTaskCompletion,
  getProgreesForRoadmap,
  getWeekProgress,
  getMyRoadMap,
  getStreak,
  dashBoardState,
};

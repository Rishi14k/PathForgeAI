const AgentConversation = require("../models/AgentConversation");
const Discovery = require("../models/Discovery");
const Roadmap = require("../models/Roadmap");
const RoadmapProgress = require("../models/RoadmapProgress");
const RoadmapTask = require("../models/RoadmapTask");
const RoadmapWeek = require("../models/RoadmapWeek");
const User = require("../models/User");
const { calculateAchievements } = require("../services/achivmentsService");
const { generateRoadmapAI } = require("../services/aiService");
const updateStreak = require("../services/updateStreak");
const { canGenerateRoadmap } = require("../utils/accessControl");

const generateRoadmap = async (req, res) => {
  try {
    const {
      goal,
      level,
      hoursPerDay,
      weekNumber,
      learningStyles = [],
      resourcePreferences = [],
    } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!goal || !level || !hoursPerDay || !weekNumber) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // const now = new Date();
    // const lastReset = new Date(user.roadmapResetDate);

    // if (
    //   now.getMonth() !== lastReset.getMonth() ||
    //   now.getFullYear() !== lastReset.getFullYear()
    // ) {
    //   user.roadmapGenerated = 0;
    //   user.roadmapResetDate = now;
    //   await user.save();
    // }

    // let maxLimit = 2;

    // if (user.planType === "paid") {
    //   maxLimit = 10;
    // }

    // if (user.roadmapGenerated >= maxLimit) {
    //   return res.status(403).json({
    //     success: false,
    //     message: `You reached your monthly roadmap limit (${maxLimit}). Upgrade your plan.`,
    //   });
    // }

    if (!canGenerateRoadmap(user)) {
      return res.status(403).json({
        success: false,
        code: "PAYMENT_REQUIRED",
        message: "Upgrade to generate more roadmaps",
      });
    }

    const allowedLearningStyles = [
      "visual",
      "reading",
      "hands-on",
      "structured",
    ];

    const allowedResources = [
      "docs",
      "videos",
      "blogs",
      "github",
      "interactive",
      "books",
    ];
    const filteredStyles = learningStyles.filter((style) =>
      allowedLearningStyles.includes(style),
    );
    const filteredResources = resourcePreferences.filter((resource) =>
      allowedResources.includes(resource),
    );

    const existingRoadmap = await Roadmap.findOne({
      userId: req.user.userId,
      goal,
      skillLevel: level,
      dailyStudyTime: hoursPerDay,
      learningStyles: filteredStyles,
      resourcePreferences: filteredResources,
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
      learningStyles: filteredStyles,
      resourcePreferences: filteredResources,
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
      learningStyles: filteredStyles,
      resourcePreferences: filteredResources,
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

    // const remaining = maxLimit - user.roadmapGenerated;

    res.status(200).json({
      success: true,
      data: roadmapData,
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
    const userId = req.user?.userId;
    // console.log("iserid",userId)
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

    const siblingTasks = await RoadmapTask.find({ weekId: task.weekId });
    const allTaskDone = siblingTasks.every((t) => t.isCompleted);

    await RoadmapWeek.findByIdAndUpdate(task.weekId, {
      isCompleted: allTaskDone,
    });

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

      const today = new Date();
      const todayMidnight = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      const lastActivity = user.streak.lastActivityDate;

      if (
        !lastActivity ||
        new Date(lastActivity).setHours(0, 0, 0, 0) !== todayMidnight.getTime()
      ) {
        updateStreak(user);
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
      progress,
      weekCompleted: allTaskDone,
    });
  } catch (error) {
    console.error("Toggle task error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const toggleProjectCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const week = await RoadmapWeek.findById(id);
    if (!week) {
      return res
        .status(404)
        .json({ success: false, message: "Week not found" });
    }

    week.projectCompleted = !week.projectCompleted;
    await week.save();

    const siblingTasks = await RoadmapTask.find({ weekId: week._id });
    const allTasksDone = siblingTasks.every((t) => t.isCompleted);

    // The week is truly complete ONLY if tasks AND project are done
    week.isCompleted = allTasksDone && week.projectCompleted;
    await week.save();

    res.status(200).json({
      success: true,
      weekId: id,
      projectCompleted: week.projectCompleted,
      isCompleted: week.isCompleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    const completedTasks = tasks.filter((task) => task.isCompleted).length || 0;
    const progressPercent =
      Math.round((completedTasks / totalTasks) * 100) || 0;

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
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id is required" });
    }

    const roadmap = await Roadmap.find({ userId })
      .select("-aiRawResponse")
      .lean();
    if (!roadmap) {
      return res
        .status(404)
        .json({ success: false, message: "Roadmap not found" });
    }
    if (!roadmap.length) {
      return res.status(200).json({
        meassge: "No roadmap found",
        success: true,
        data: [],
      });
    }
    const roadmapIds = roadmap.map((r) => r._id);

    const progress = await RoadmapProgress.find({
      userId,
      roadmapId: { $in: roadmapIds },
    }).lean();
    const progressMap = {};
    progress.forEach((p) => {
      progressMap[p.roadmapId.toString()] = p;
    });

    const finalData = roadmap.map((r) => ({
      ...r,
      progress: progressMap[r._id.toString()] || {
        totalTasks: 0,
        completedTasks: 0,
        progressPercent: 0,
      },
    }));

    res.status(200).json({ success: true, data: finalData });
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
      "roadmapGenerated planType streak",
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const roadmapGenerated = user.roadmapGenerated;
    const planType = user.planType;

    const roadmap = await Roadmap.findOne({ userId });
    const progress = await RoadmapProgress.findOne({ userId });
    // console.log(progress)
    // if (!progress) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Progress not found" });
    // }
    const totalRoadmaps = roadmap?.length || 0;
    const status = roadmap?.status;
    const totalTask = progress?.totalTasks || 0;
    const completedTasks = progress?.completedTasks || 0;
    const progressPercent = progress?.progressPercent || 0;
    const currentRoadmap = roadmap?._id;

    res.status(200).json({
      success: true,
      data: {
        roadmapGenerated,
        planType,
        streak: user.streak.currentStreak || 0,
        logestStreak: user.streak.longestStreak || 0,
        totalRoadmaps,
        status,
        totalTask,
        completedTasks,
        progressPercent,
        currentRoadmap,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    const progressDocs = await RoadmapProgress.find({ userId }).populate(
      "roadmapId",
      "goal durationWeeks skillLevel",
    );
    if (!progressDocs.length) {
      return res.json({
        stats: {},
        weeklyActivity: [],
        monthlyProgress: [],
        roadmapProgress: [],
        achievements: [],
      });
    }

    const totalTasksDone = progressDocs.reduce(
      (sum, r) => sum + r.completedTasks,
      0,
    );
    const roadmapsActive = progressDocs.length;

    const hoursLearned = Number((totalTasksDone * 0.5).toFixed(1));

    const activeRoadmap = progressDocs[0];

    const weeks = await RoadmapWeek.find({
      roadmapId: activeRoadmap.roadmapId._id,
    }).sort({ weekNumber: 1 });

    const weekIds = weeks.map((w) => w._id);

    const tasks = await RoadmapTask.find({
      weekId: { $in: weekIds },
    });

    /* ---------------- WEEKLY ACTIVITY ---------------- */

    const weeklyActivity = weeks.map((week) => {
      const weekTasks = tasks.filter(
        (t) => t.weekId.toString() === week._id.toString(),
      );

      const completedTasks = weekTasks.filter((t) => t.isCompleted).length;

      return {
        week: `W${week.weekNumber}`,
        tasks: completedTasks,
        hours: Number((completedTasks * 0.5).toFixed(1)),
      };
    });

    /* ---------------- MONTHLY PROGRESS ---------------- */

    const monthlyProgress = progressDocs.map((r, i) => ({
      month: `M${i + 1}`,
      progress: r.progressPercent,
    }));

    /* ---------------- ROADMAP PROGRESS ---------------- */

    const roadmapProgress = await Promise.all(
      progressDocs.map(async (r) => {
        const totalWeeks = await RoadmapWeek.countDocuments({
          roadmapId: r.roadmapId._id,
        });

        const completedWeeks = await RoadmapWeek.countDocuments({
          roadmapId: r.roadmapId._id,
          isCompleted: true,
        });

        return {
          name: r.roadmapId.goal,
          progress: r.progressPercent,
          weeks: `${completedWeeks}/${totalWeeks}`,
        };
      }),
    );

    const achievements = calculateAchievements({
      totalTasksDone,
      roadmapsActive,
      hoursLearned,
      streakDays: user?.streak?.currentStreak,
    });

    res.json({
      stats: {
        totalTasksDone,
        hoursLearned,
        roadmapsActive,
      },
      weeklyActivity,
      monthlyProgress,
      roadmapProgress,
      achievements,
      streak: user?.streak?.currentStreak,
      longestStreak: user?.streak?.longestStreak,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsageStatus = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch only the necessary fields for better performance
    const user = await User.findById(userId).select(
      "planType roadmapGenerated discoveryGenerated",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentPlan = user.planType || "free";

    const limits = {
      free: {
        roadmapLimit: 1,
        discoveryLimit: 2,
      },
      paid: {
        // Changed "pro" to "paid" to match your enum
        roadmapLimit: Infinity,
        discoveryLimit: Infinity,
      },
    };

    const planLimits = limits[currentPlan];

    res.json({
      plan: currentPlan,
      roadmap: {
        used: user.roadmapGenerated || 0,
        limit: planLimits.roadmapLimit,
        allowed: (user.roadmapGenerated || 0) < planLimits.roadmapLimit,
      },
      discovery: {
        used: user.discoveryGenerated || 0,
        limit: planLimits.discoveryLimit,
        allowed: (user.discoveryGenerated || 0) < planLimits.discoveryLimit,
      },
    });
  } catch (err) {
    console.error("Usage Check Error:", err);
    res.status(500).json({ message: "Usage check failed" });
  }
};

const getAgentHistory = async(req,res)=>{
  try {
    const {roadmapId} = req.params
    const userId  = req.user.userId

    const convo = await AgentConversation.findOne({userId,roadmapId})

    res.status(200).json({
      data:convo?.messages || [],
      success:true
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

module.exports = {
  generateRoadmap,
  getRoadmapById,
  toggleTaskCompletion,
  getProgreesForRoadmap,
  getWeekProgress,
  getMyRoadMap,
  getStreak,
  dashBoardState,
  toggleProjectCompletion,
  getUserProgress,
  getUsageStatus,
  getAgentHistory
};

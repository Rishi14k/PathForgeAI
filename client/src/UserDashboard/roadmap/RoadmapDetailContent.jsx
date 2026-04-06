import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Clock,
  BookOpen,
  Flame,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Target,
  Calendar,
  Lock,
  Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchRoadmapByIdThunk,
  toggleProjectThunk,
  toggleTaskThunk,
} from "../../redux/features/dashboard/singleRoadmapSlice";

const taskTypeConfig = {
  video: { label: "Video", color: "#7C3AED", bg: "rgba(124, 58, 237, 0.12)" },
  reading: {
    label: "Reading",
    color: "#06B6D4",
    bg: "rgba(6, 182, 212, 0.12)",
  },
  exercise: {
    label: "Exercise",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.12)",
  },
  project: {
    label: "Project",
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.12)",
  },
};

const RoadmapDetailContent = () => {
  const [expandedWeeks, setExpandedWeeks] = useState([4]);

  const dispatch = useDispatch();
  const { roadmapId } = useParams();
  console.log("rd id", roadmapId);

  const { roadmap, weeks, progress, loading } = useSelector(
    (state) => state.singleRoadmap,
  );
  const streak =
    useSelector((state) => state.dashboard.data?.data?.streak) || 0;

  useEffect(() => {
    dispatch(fetchRoadmapByIdThunk(roadmapId));
  }, [dispatch, roadmapId]);

  const toggleWeek = (weekId) => {
    setExpandedWeeks((prev) =>
      prev.includes(weekId)
        ? prev.filter((w) => w !== weekId)
        : [...prev, weekId],
    );
  };

  return (
    <div className="space-y-8">
      {/* Back nav */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="/dashboard/my-roadmaps"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: "#9CA3AF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#9F67FF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
        >
          <ArrowLeft size={15} />
          Back to My Roadmaps
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl p-6 lg:p-8"
        style={{
          background: "rgba(17, 24, 39, 0.85)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        {/* Top accent */}
        <div
          className="h-0.5 w-full rounded-full mb-6"
          style={{
            background: "linear-gradient(90deg, #7C3AED, #9F67FF, #06B6D4)",
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                style={{
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "#10B981",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active
              </span>
              {roadmap?.aiProvider && (
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  style={{
                    background: "rgba(124, 58, 237, 0.12)",
                    color: "#9F67FF",
                    border: "1px solid rgba(124, 58, 237, 0.25)",
                  }}
                >
                  <Sparkles size={10} />
                  AI Generated
                </span>
              )}
            </div>
            <h1
              className="text-2xl lg:text-3xl font-bold mb-2"
              style={{ color: "#F9FAFB" }}
            >
              {roadmap?.goal}
            </h1>
            <p
              className="text-sm leading-relaxed mb-4 max-w-2xl"
              style={{ color: "#9CA3AF" }}
            >
              {/* {roadmap?.description} */}
              Your path to success is mapped out. We've organized the essential
              topics and practical tasks into a manageable flow—all you need to
              do is start. Track your streak, hit your milestones, and reach
              your goal.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {roadmap?.learningStyles.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{
                    background: "rgba(45, 55, 72, 0.5)",
                    color: "#9CA3AF",
                    border: "1px solid rgba(45, 55, 72, 0.5)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 lg:w-64 flex-shrink-0">
            {[
              {
                icon: Target,
                label: "Progress",
                value: `${progress?.progressPercent}%`,
                color: "#9F67FF",
              },
              {
                icon: Flame,
                label: "Streak",
                value: `${streak} days`,
                color: "#F59E0B",
              },
              {
                icon: BookOpen,
                label: "Tasks Completed",
                value: `${progress?.completedTasks}/${progress?.totalTasks}`,
                color: "#06B6D4",
              },
              {
                icon: Clock,
                label: "Per Day Study Time",
                value: `${roadmap?.dailyStudyTime}h`,
                color: "#10B981",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "rgba(45, 55, 72, 0.2)",
                  border: "1px solid rgba(45, 55, 72, 0.4)",
                }}
              >
                <stat.icon
                  size={16}
                  style={{ color: stat.color, margin: "0 auto 6px" }}
                />
                <p
                  className="text-base font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
              {progress?.completedTasks} of {progress?.totalTasks} tasks
              completed
            </span>
            <span className="text-sm font-bold" style={{ color: "#9F67FF" }}>
              {progress?.progressPercent}%
            </span>
          </div>
          <div
            className="h-2 rounded-full"
            style={{ background: "rgba(45, 55, 72, 0.5)" }}
          >
            <motion.div
              className="h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress?.progressPercent}%` }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              style={{ background: "linear-gradient(90deg, #7C3AED, #9F67FF)" }}
            />
          </div>
        </div>

        {/* Action buttons */}
        {/* <div className="flex gap-3 mt-6">
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #9F67FF)",
              color: "#fff",
            }}
          >
            <Play size={14} />
            Continue Learning
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: "rgba(45, 55, 72, 0.4)",
              color: "#9CA3AF",
              border: "1px solid rgba(45, 55, 72, 0.5)",
            }}
          >
            <Pause size={14} />
            Pause
          </button>
        </div> */}
      </motion.div>

      {/* Week-by-week breakdown */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-5"
        >
          <Calendar size={18} style={{ color: "#9F67FF" }} />
          <h2 className="text-lg font-semibold" style={{ color: "#F9FAFB" }}>
            Weekly Curriculum
          </h2>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "rgba(124, 58, 237, 0.12)", color: "#9F67FF" }}
          >
            {weeks.length} weeks
          </span>
        </motion.div>

        <div className="space-y-3">
          {weeks.map((week, idx) => {
            const isExpanded = expandedWeeks.includes(week?._id);
            const completedCount = week.tasks.filter(
              (t) => t?.isCompleted,
            ).length;
            const totalTasks = week?.tasks.length || 0;
            const weekProgress = Math.round(
              (completedCount / totalTasks) * 100,
            );
            const isCompletedRoadmap = completedCount === totalTasks;
            const prevWeek = weeks[idx - 1];
            const isUnlocked =
              idx === 0 ||
              (prevWeek &&
                prevWeek.tasks.filter((t) => t?.isCompleted).length /
                  prevWeek.tasks.length >=
                  0.5);
            // console.log("unloacked",isUnlocked)
            const isCompleted = week?.isCompleted;

            return (
              <motion.div
                key={week._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: isCompleted
                    ? "rgba(16, 185, 129, 0.04)"
                    : isUnlocked
                      ? "rgba(17, 24, 39, 0.85)"
                      : "rgba(17, 24, 39, 0.4)",
                  border: isCompleted
                    ? "1px solid rgba(16, 185, 129, 0.2)"
                    : isUnlocked
                      ? "1px solid rgba(45, 55, 72, 0.5)"
                      : "1px solid rgba(45, 55, 72, 0.25)",
                  opacity: isUnlocked ? 1 : 0.6,
                }}
              >
                {/* Week header */}
                <button
                  className="w-full flex items-center gap-4 p-4 lg:p-5 text-left"
                  onClick={() => isUnlocked && toggleWeek(week?._id)}
                  disabled={!isUnlocked}
                >
                  {/* Week number */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{
                      background: isCompleted
                        ? "rgba(16, 185, 129, 0.15)"
                        : isUnlocked
                          ? "rgba(124, 58, 237, 0.15)"
                          : "rgba(45, 55, 72, 0.3)",
                      color: isCompleted
                        ? "#10B981"
                        : isUnlocked
                          ? "#9F67FF"
                          : "#4B5563",
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} />
                    ) : isUnlocked ? (
                      `W${week?.weekNumber}`
                    ) : (
                      <Lock size={15} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3
                        className="text-sm font-semibold truncate"
                        style={{
                          color: isUnlocked ? "#F9FAFB" : "#6B7280",
                        }}
                      >
                        {/* Week {week?._id}: {week.title} */}
                        Week {week?.weekNumber}
                      </h3>
                    </div>
                    <p
                      className="text-xs truncate"
                      style={{ color: "#6B7280" }}
                    >
                      {week.topics.join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <p
                        className="text-xs font-medium"
                        style={{
                          color: isCompleted ? "#10B981" : "#9CA3AF",
                        }}
                      >
                        {completedCount}/{week.tasks.length} tasks
                      </p>
                      <p className="text-xs" style={{ color: "#4B5563" }}>
                        {weekProgress}%
                      </p>
                    </div>
                    {isUnlocked &&
                      (isExpanded ? (
                        <ChevronUp size={16} style={{ color: "#6B7280" }} />
                      ) : (
                        <ChevronDown size={16} style={{ color: "#6B7280" }} />
                      ))}
                  </div>
                </button>

                {/* Week progress bar */}
                {isUnlocked && (
                  <div className="px-4 lg:px-5 pb-3">
                    <div
                      className="h-1 rounded-full"
                      style={{ background: "rgba(45, 55, 72, 0.4)" }}
                    >
                      <div
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          width: `${weekProgress}%`,
                          background: isCompleted
                            ? "linear-gradient(90deg, #10B981, #06B6D4)"
                            : "linear-gradient(90deg, #7C3AED, #9F67FF)",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Tasks list */}
                {isExpanded && isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 lg:px-5 pb-4 space-y-2"
                    style={{ borderTop: "1px solid rgba(45, 55, 72, 0.3)" }}
                  >
                    <div className="pt-3 space-y-2">
                      {week.tasks.map((task) => {
                        const typeConf = taskTypeConfig[task.type];
                        return (
                          <div
                            key={task?._id}
                            className="flex items-center gap-3 p-3 rounded-xl transition-all"
                            style={{
                              background: task.completed
                                ? "rgba(16, 185, 129, 0.05)"
                                : "rgba(45, 55, 72, 0.15)",
                              border: `1px solid ${task.completed ? "rgba(16, 185, 129, 0.15)" : "rgba(45, 55, 72, 0.3)"}`,
                            }}
                            onClick={() => dispatch(toggleTaskThunk(task?._id))}
                          >
                            {task.isCompleted ? (
                              <CheckCircle2
                                size={16}
                                style={{ color: "#10B981", flexShrink: 0 }}
                              />
                            ) : (
                              <Circle
                                size={16}
                                style={{ color: "#4B5563", flexShrink: 0 }}
                              />
                            )}
                            <span
                              className="text-sm flex-1"
                              style={{
                                color: task.isCompleted ? "#9CA3AF" : "#F9FAFB",
                                textDecoration: task.isCompleted
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {task?.taskTitle}
                            </span>

                            <p className="text-xs mt-1 flex flex-wrap gap-1.5">
                              {week.topics.map((topic) => (
                                <span
                                  key={topic}
                                  className="px-2 py-0.5 rounded-md text-[11px]"
                                  style={{
                                    background: "rgba(124,58,237,0.12)",
                                    color: "#9F67FF",
                                    border: "1px solid rgba(124,58,237,0.25)",
                                  }}
                                >
                                  {topic}
                                </span>
                              ))}
                            </p>
                            {/* <span
                              className="text-xs px-2 py-0.5 rounded-md font-medium flex-shrink-0"
                              style={{
                                background: typeConf.bg,
                                color: typeConf.color,
                              }}
                            >
                              {typeConf.label}
                            </span> */}
                            {/* <span
                              className="text-xs flex-shrink-0"
                              style={{ color: "#6B7280" }}
                            >
                              {task.duration}
                            </span> */}
                          </div>
                        );
                      })}
                    </div>

                    {week?.project && (
                      <div
                        className={`mt-3 p-3 rounded-xl border transition-all ${
                          week?.projectCompleted
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-purple-500/20 bg-gray-900/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-wider text-purple-400 font-bold mb-1">
                              Weekly Project
                            </p>
                            <p
                              className={`text-sm ${week.projectCompleted ? "line-through text-gray-400" : "text-white"}`}
                            >
                              {week?.project}
                            </p>
                          </div>

                          {/* Toggle Checkbox for Project */}
                          <button
                            onClick={() =>
                              dispatch(toggleProjectThunk(week._id))
                            }
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              week?.projectCompleted
                                ? "bg-purple-500 border-purple-500 text-white"
                                : "border-purple-500/50 hover:border-purple-500"
                            }`}
                          >
                            {week?.projectCompleted && <Check size={14} />}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetailContent;

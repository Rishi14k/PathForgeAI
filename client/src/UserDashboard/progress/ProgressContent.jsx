import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Flame,
  CheckCircle2,
  Clock,
  Target,
  Award,
  BookOpen,
  Zap,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProgressThunk } from "../../redux/features/dashboard/progressSlice";
import { achievementMeta } from "./achivementMeta";
import ProgressLoading from "./ProgressLoading";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-3 py-2.5"
        style={{
          background: "rgba(17, 24, 39, 0.98)",
          border: "1px solid rgba(45, 55, 72, 0.6)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: "#F9FAFB" }}>
          {label}
        </p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs" style={{ color: "#9CA3AF" }}>
            <span style={{ color: entry.color }}>●</span> {entry.name}:{" "}
            <strong style={{ color: "#F9FAFB" }}>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ProgressContent = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  const dispatch = useDispatch();

  const {
    stats,
    weeklyActivity,
    monthlyProgress,
    roadmapProgress,
    achievements,
    loading,
    streak,
    longestStreak,
  } = useSelector((state) => state.progress);

  useEffect(() => {
    if (!stats) {
      dispatch(getProgressThunk());
    }
  }, [dispatch]);

  if (loading) {
    return <ProgressLoading />;
  }

  const safeWeeklyActivity =
    weeklyActivity?.length > 0
      ? weeklyActivity
      : [{ week: "W0", tasks: 0, hours: 0 }];

  const safeMonthlyProgress =
    monthlyProgress?.length > 0
      ? monthlyProgress
      : [{ month: "M0", progress: 0 }];

  const enrichedAchievements =
    achievements?.map((a) => ({
      ...a,
      ...(achievementMeta[a.id] || {}),
    })) || [];
  const statCards = [
    {
      label: "Total Tasks Done",
      value: stats?.totalTasksDone ?? 0,
      icon: CheckCircle2,
      color: "#10B981",
      change: "Keep it up!",
    },
    {
      label: "Hours Learned",
      value: `${stats?.hoursLearned ?? 0}h`,
      icon: Clock,
      color: "#9F67FF",
      change: "Give more time on growth!",
    },
    {
      label: "Current Streak",
      value: `${streak} days`, // backend not sending yet
      icon: Flame,
      color: "#F59E0B",
      change: `Longest streak: ${longestStreak}`,
    },
    {
      label: "Roadmaps Active",
      value: stats?.roadmapsActive ?? 0,
      icon: Target,
      color: "#06B6D4",
      change: "1 near completion",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#F9FAFB" }}>
          Your Progress
        </h1>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Track your learning journey and celebrate milestones
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl p-4"
            style={{
              background: "rgba(17, 24, 39, 0.85)",
              border: "1px solid rgba(45, 55, 72, 0.5)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${card.color}18` }}
              >
                <card.icon size={17} style={{ color: card.color }} />
              </div>
            </div>
            <p
              className="text-2xl font-bold mb-0.5"
              style={{ color: "#F9FAFB" }}
            >
              {card.value}
            </p>
            <p
              className="text-xs font-medium mb-1"
              style={{ color: "#9CA3AF" }}
            >
              {card.label}
            </p>
            <p className="text-xs" style={{ color: card.color }}>
              {card.change}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Activity chart */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl p-5 lg:p-6"
        style={{
          background: "rgba(17, 24, 39, 0.85)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={17} style={{ color: "#9F67FF" }} />
            <h2
              className="text-base font-semibold"
              style={{ color: "#F9FAFB" }}
            >
              Learning Activity
            </h2>
          </div>
          <div
            className="flex gap-1 p-1 rounded-xl"
            style={{ background: "rgba(45, 55, 72, 0.3)" }}
          >
            {["weekly", "monthly"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
                style={{
                  // Check if this specific tab is the active one
                  background:
                    activeTab === tab
                      ? "rgba(124, 58, 237, 0.2)"
                      : "transparent",
                  color: activeTab === tab ? "#9F67FF" : "#9CA3AF",
                  border:
                    activeTab === tab
                      ? "1px solid rgba(124, 58, 237, 0.3)"
                      : "1px solid transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          {activeTab === "weekly" ? (
            <BarChart data={safeWeeklyActivity} barGap={4}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(45,55,72,0.3)"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="tasks"
                name="Tasks"
                fill="#7C3AED"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="hours"
                name="Hours"
                fill="rgba(124,58,237,0.3)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <AreaChart data={safeMonthlyProgress}>
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(45,55,72,0.3)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="progress"
                name="Progress %"
                stroke="#9F67FF"
                strokeWidth={2}
                fill="url(#progressGrad)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Roadmap progress */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl p-5 lg:p-6"
        style={{
          background: "rgba(17, 24, 39, 0.85)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <BookOpen size={17} style={{ color: "#9F67FF" }} />
          <h2 className="text-base font-semibold" style={{ color: "#F9FAFB" }}>
            Roadmap Progress
          </h2>
        </div>
        <div className="space-y-4">
          {roadmapProgress?.map((rp) => (
            <div key={rp.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: rp.color }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#F9FAFB" }}
                  >
                    {rp.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "#6B7280" }}>
                    {rp.weeks} weeks
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: rp.color }}
                  >
                    {rp.progress}%
                  </span>
                </div>
              </div>
              <div
                className="h-2 rounded-full"
                style={{ background: "rgba(45, 55, 72, 0.4)" }}
              >
                <motion.div
                  className="h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${rp.progress}%` }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  style={{ background: "#06B6D4" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Award size={17} style={{ color: "#9F67FF" }} />
          <h2 className="text-base font-semibold" style={{ color: "#F9FAFB" }}>
            Achievements
          </h2>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "rgba(124, 58, 237, 0.12)", color: "#9F67FF" }}
          >
            {enrichedAchievements.filter((a) => a.earned).length}/
            {achievements.length}
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {enrichedAchievements.map((ach) => (
            <motion.div
              key={ach.id}
              whileHover={ach.earned ? { y: -2 } : {}}
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: ach.earned
                  ? "rgba(17, 24, 39, 0.85)"
                  : "rgba(17, 24, 39, 0.4)",
                border: ach.earned
                  ? `1px solid ${ach.color}30`
                  : "1px solid rgba(45, 55, 72, 0.3)",
                opacity: ach.earned ? 1 : 0.5,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: ach.earned
                    ? `${ach.color}18`
                    : "rgba(45, 55, 72, 0.3)",
                }}
              >
                {ach.icon && <ach.icon size={18} />}
              </div>
              <div className="min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: ach.earned ? "#F9FAFB" : "#6B7280" }}
                >
                  {ach.title}
                </p>
                <p className="text-xs truncate" style={{ color: "#6B7280" }}>
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProgressContent;
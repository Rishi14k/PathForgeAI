import React, { useState } from "react";
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

const weeklyActivity = [
  { week: "W1", tasks: 12, hours: 8 },
  { week: "W2", tasks: 18, hours: 11 },
  { week: "W3", tasks: 9, hours: 6 },
  { week: "W4", tasks: 22, hours: 14 },
  { week: "W5", tasks: 15, hours: 10 },
  { week: "W6", tasks: 27, hours: 16 },
  { week: "W7", tasks: 20, hours: 13 },
  { week: "W8", tasks: 31, hours: 18 },
];

const monthlyProgress = [
  { month: "Oct", progress: 15 },
  { month: "Nov", progress: 32 },
  { month: "Dec", progress: 48 },
  { month: "Jan", progress: 61 },
  { month: "Feb", progress: 74 },
  { month: "Mar", progress: 87 },
];

const roadmapProgress = [
  { name: "Full-Stack React", progress: 37, color: "#7C3AED", weeks: "4/12" },
  { name: "Python ML Basics", progress: 65, color: "#06B6D4", weeks: "8/12" },
  { name: "System Design", progress: 20, color: "#F59E0B", weeks: "2/10" },
  {
    name: "DevOps Fundamentals",
    progress: 90,
    color: "#10B981",
    weeks: "9/10",
  },
];

const achievements = [
  {
    id: "a1",
    title: "7-Day Streak",
    description: "Learned 7 days in a row",
    icon: Flame,
    color: "#F59E0B",
    earned: true,
  },
  {
    id: "a2",
    title: "First Roadmap",
    description: "Completed your first roadmap",
    icon: Award,
    color: "#9F67FF",
    earned: true,
  },
  {
    id: "a3",
    title: "Speed Learner",
    description: "Completed 10 tasks in one day",
    icon: Zap,
    color: "#06B6D4",
    earned: true,
  },
  {
    id: "a4",
    title: "30-Day Streak",
    description: "Learned 30 days in a row",
    icon: Flame,
    color: "#EF4444",
    earned: false,
  },
  {
    id: "a5",
    title: "Centurion",
    description: "Complete 100 total tasks",
    icon: Target,
    color: "#10B981",
    earned: false,
  },
  {
    id: "a6",
    title: "Knowledge Seeker",
    description: "Complete 5 roadmaps",
    icon: BookOpen,
    color: "#F59E0B",
    earned: false,
  },
];

const statCards = [
  {
    label: "Total Tasks Done",
    value: "154",
    icon: CheckCircle2,
    color: "#10B981",
    change: "+12 this week",
  },
  {
    label: "Hours Learned",
    value: "96h",
    icon: Clock,
    color: "#9F67FF",
    change: "+8h this week",
  },
  {
    label: "Current Streak",
    value: "7 days",
    icon: Flame,
    color: "#F59E0B",
    change: "Personal best: 14",
  },
  {
    label: "Roadmaps Active",
    value: "4",
    icon: Target,
    color: "#06B6D4",
    change: "1 near completion",
  },
];

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
  return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Page header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#F9FAFB' }}>Your Progress</h1>
        <p className="text-sm" style={{ color: '#9CA3AF' }}>Track your learning journey and celebrate milestones</p>
      </motion.div>

      {/* Stat cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl p-4"
            style={{ background: 'rgba(17, 24, 39, 0.85)', border: '1px solid rgba(45, 55, 72, 0.5)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${card.color}18` }}
              >
                <card.icon size={17} style={{ color: card.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ color: '#F9FAFB' }}>{card.value}</p>
            <p className="text-xs font-medium mb-1" style={{ color: '#9CA3AF' }}>{card.label}</p>
            <p className="text-xs" style={{ color: card.color }}>{card.change}</p>
          </div>
        ))}
      </motion.div>

      {/* Activity chart */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl p-5 lg:p-6"
        style={{ background: 'rgba(17, 24, 39, 0.85)', border: '1px solid rgba(45, 55, 72, 0.5)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={17} style={{ color: '#9F67FF' }} />
            <h2 className="text-base font-semibold" style={{ color: '#F9FAFB' }}>Learning Activity</h2>
          </div>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(45, 55, 72, 0.3)' }}>
            {(['weekly', 'monthly']).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
            style={{
  // Check if this specific tab is the active one
  background: activeTab === tab ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
  color: activeTab === tab ? '#9F67FF' : '#9CA3AF',
  border: activeTab === tab ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid transparent',
}}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          {activeTab === 'weekly' ? (
            <BarChart data={weeklyActivity} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,55,72,0.3)" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="tasks" name="Tasks" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              <Bar dataKey="hours" name="Hours" fill="rgba(124,58,237,0.3)" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={monthlyProgress}>
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,55,72,0.3)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="progress" name="Progress %" stroke="#9F67FF" strokeWidth={2} fill="url(#progressGrad)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Roadmap progress */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl p-5 lg:p-6"
        style={{ background: 'rgba(17, 24, 39, 0.85)', border: '1px solid rgba(45, 55, 72, 0.5)' }}
      >
        <div className="flex items-center gap-2 mb-5">
          <BookOpen size={17} style={{ color: '#9F67FF' }} />
          <h2 className="text-base font-semibold" style={{ color: '#F9FAFB' }}>Roadmap Progress</h2>
        </div>
        <div className="space-y-4">
          {roadmapProgress.map((rp) => (
            <div key={rp.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: rp.color }} />
                  <span className="text-sm font-medium" style={{ color: '#F9FAFB' }}>{rp.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: '#6B7280' }}>{rp.weeks} weeks</span>
                  <span className="text-sm font-bold" style={{ color: rp.color }}>{rp.progress}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'rgba(45, 55, 72, 0.4)' }}>
                <motion.div
                  className="h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${rp.progress}%` }}
                  transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                  style={{ background: rp.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Award size={17} style={{ color: '#9F67FF' }} />
          <h2 className="text-base font-semibold" style={{ color: '#F9FAFB' }}>Achievements</h2>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124, 58, 237, 0.12)', color: '#9F67FF' }}>
            {achievements.filter((a) => a.earned).length}/{achievements.length}
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
              whileHover={ach.earned ? { y: -2 } : {}}
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: ach.earned ? 'rgba(17, 24, 39, 0.85)' : 'rgba(17, 24, 39, 0.4)',
                border: ach.earned ? `1px solid ${ach.color}30` : '1px solid rgba(45, 55, 72, 0.3)',
                opacity: ach.earned ? 1 : 0.5,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: ach.earned ? `${ach.color}18` : 'rgba(45, 55, 72, 0.3)' }}
              >
                <ach.icon size={18} style={{ color: ach.earned ? ach.color : '#4B5563' }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: ach.earned ? '#F9FAFB' : '#6B7280' }}>
                  {ach.title}
                </p>
                <p className="text-xs truncate" style={{ color: '#6B7280' }}>{ach.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProgressContent;

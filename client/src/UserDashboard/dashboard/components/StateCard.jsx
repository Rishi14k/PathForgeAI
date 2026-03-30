import React from "react";
import { motion } from "framer-motion";
import { Flame, Map, BarChart2, CheckCircle2 } from "lucide-react";
import Icon from "../../../components/Icon"

const stats = [
  {
    id: "stat-streak",
    label: "Study Streak",
    value: "7",
    unit: "days",
    icon: Flame,
    iconColor: "#F59E0B",
    iconBg: "rgba(245, 158, 11, 0.15)",
    trend: "+2 from last week",
    trendPositive: true,
    glowColor: "rgba(245, 158, 11, 0.1)",
  },
  {
    id: "stat-roadmaps",
    label: "Active Roadmaps",
    value: "3",
    unit: "in progress",
    icon: Map,
    iconColor: "#7C3AED",
    iconBg: "rgba(124, 58, 237, 0.15)",
    trend: "1 completed this month",
    trendPositive: true,
    glowColor: "rgba(124, 58, 237, 0.1)",
  },
  {
    id: "stat-weekly",
    label: "Weekly Progress",
    value: "68",
    unit: "% complete",
    icon: BarChart2,
    iconColor: "#06B6D4",
    iconBg: "rgba(6, 182, 212, 0.15)",
    trend: "↑ 12% vs last week",
    trendPositive: true,
    glowColor: "rgba(6, 182, 212, 0.08)",
  },
  {
    id: "stat-completed",
    label: "Completed Tasks",
    value: "142",
    unit: "all time",
    icon: CheckCircle2,
    iconColor: "#10B981",
    iconBg: "rgba(16, 185, 129, 0.15)",
    trend: "+8 this week",
    trendPositive: true,
    glowColor: "rgba(16, 185, 129, 0.08)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const StateCard = () => {
  return (
    <div>
      <h3
        className="text-sm font-semibold uppercase tracking-widest mb-4"
        style={{ color: "#6B7280", letterSpacing: "0.08em" }}
      >
        Overview
      </h3>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3, scale: 1.01 }}
              className="stat-card cursor-default"
              style={{ boxShadow: `0 4px 24px ${stat.glowColor}` }} 
            >
              {/* background glow  */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${stat.glowColor}, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: stat.iconBg }}
                  >
                    <Icon size={20} style={{ color: stat.iconColor }} />
                  </div>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: stat.iconColor,
                      boxShadow: `0 0 6px ${stat.iconColor}`,
                    }}
                  />
                </div>
                <div className="flex items-end gap-1.5 mb-1">
                  <span
                    className="text-3xl font-bold mono"
                    style={{
                      color: "#F9FAFB",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs pb-1.5" style={{ color: "#9CA3AF" }}>
                    {stat.unit}
                  </span>
                </div>
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: "#9CA3AF" }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-xs"
                  style={{ color: stat.trendPositive ? "#10B981" : "#EF4444" }}
                >
                  {stat.trend}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StateCard;

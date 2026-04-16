import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, CheckCircle2, BarChart3, BookOpen } from "lucide-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { dashboardStateThunk } from "../../../redux/features/dashboard/dashboardStateSlice";
import GhostLock from "./GhostLock";
import StateCardSkeleton from "./StateCardSkeleton";

/* ---------------- ANIMATION ---------------- */

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.25,
      ease: "easeOut",
    },
  }),
};

/* ---------------- MAIN COMPONENT ---------------- */

const StateCard = () => {
  const dispatch = useDispatch();

  // ✅ Prevent re-render storms
  const data = useSelector((state) => state.dashboard.data?.data, shallowEqual);

  useEffect(() => {
    dispatch(dashboardStateThunk());
  }, [dispatch]);

  const isGhostMode =
    !data || data.roadmapGenerated === 0 || data.totalTask === 0;

  if (!data) return <StateCardSkeleton />;

  return (
    <div>
      <h3
        className="text-sm font-semibold uppercase tracking-wide mb-4 will-change-transform"
        style={{
          color: "#6B7280",
          transform: "translateZ(0)",
        }}
      >
        Overview
      </h3>

      {/* ---------- Wrapper ---------- */}
      <div className="relative">
        {/* ✅ GRID (NO BLUR ANYMORE) */}
        <div
          className={`grid grid-cols-2 xl:grid-cols-4 gap-4 transition-opacity duration-300 ${
            isGhostMode ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <StateCardUI
            index={0}
            label="Study Streak"
            value={data.streak}
            unit="days"
            icon={Flame}
            color="#F59E0B"
            trend="Keep the fire alive 🔥"
            isGhostMode={isGhostMode}
          />

          <StateCardUI
            index={1}
            label="Active Roadmaps"
            value={data.roadmapGenerated}
            icon={BookOpen}
            color="#7C3AED"
            trend={data.status}
            isGhostMode={isGhostMode}
          />

          <StateCardUI
            index={2}
            label="Completed Tasks"
            value={data.completedTasks}
            unit={`/${data.totalTask}`}
            icon={CheckCircle2}
            color="#10B981"
            trend={`${data.progressPercent}% completed`}
            isGhostMode={isGhostMode}
          />

          <StateCardUI
            index={3}
            label="Overall Progress"
            value={data.progressPercent}
            unit="%"
            icon={BarChart3}
            color="#3B82F6"
            trend="Learning in orbit"
            isGhostMode={isGhostMode}
          />
        </div>

        {/* ✅ OVERLAY OUTSIDE FLOW */}
        {isGhostMode && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <GhostLock />
          </div>
        )}
      </div>
    </div>
  );
};

export default StateCard;

/* ---------------- CARD UI ---------------- */

const StateCardUI = ({
  index = 0,
  label,
  value,
  unit = "",
  icon: Icon,
  color = "#3B82F6",
  trend,
  trendPositive = true,
  isGhostMode,
}) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      // ✅ Disable hover animation for ghost mode
      whileHover={!isGhostMode ? { y: -4, scale: 1.05 } : {}}
      className="relative stat-card cursor-default overflow-hidden will-change-transform"
      style={{
        boxShadow: `0 6px 28px ${color}30`,
        transform: "translateZ(0)", // GPU acceleration
      }}
    >
      {/* Glow Background */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${color}40, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${color}25` }}
          >
            {Icon && <Icon size={20} style={{ color }} />}
          </div>

          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
          />
        </div>

        {/* Value */}
        <div className="flex items-end gap-1.5 mb-1">
          <span
            className="text-3xl font-bold mono"
            style={{
              color: "#F9FAFB",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {value}
          </span>

          {unit && (
            <span className="text-xs pb-1.5 text-[#9CA3AF]">{unit}</span>
          )}
        </div>

        {/* Label */}
        <p className="text-sm font-medium mb-2 text-[#9CA3AF]">{label}</p>

        {/* Trend */}
        {trend && (
          <p
            className="text-xs"
            style={{
              color: trendPositive ? "#10B981" : "#EF4444",
            }}
          >
            {trend}
          </p>
        )}
      </div>
    </motion.div>
  );
};

import React, { useState } from "react";
import {
  Flame,
  Clock,
  BookOpen,
  MoreHorizontal,
  Play,
  Pause,
  Trash2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const statusConfig = {
  active: { label: "Active", className: "badge-active", dot: "#10B981" },
  paused: { label: "Paused", className: "badge-paused", dot: "#F59E0B" },
  completed: {
    label: "Completed",
    className: "badge-completed",
    dot: "#9F67FF",
  },
};

const skillLevelColor = {
  Beginner: "#10B981",
  Intermediate: "#F59E0B",
  Advanced: "#EF4444",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const RoadmapCard = ({ roadmap }) => {
    const [menuOpen, setMenuOpen] = useState(false);
  const status = statusConfig[roadmap.status];
  const skillColor = skillLevelColor[roadmap.skillLevel] || '#9CA3AF';
  return (
    <Link href={`/roadmap/${roadmap.id}`} className="block">
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -3, scale: 1.01 }}
        className="roadmap-card-hover rounded-2xl flex flex-col cursor-pointer relative"
        style={{
          background: "rgba(17, 24, 39, 0.85)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
          overflow: "hidden",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-0.5 w-full"
          style={{
            background:
              roadmap.status === "completed"
                ? "linear-gradient(90deg, #7C3AED, #9F67FF)"
                : roadmap.status === "active"
                  ? "linear-gradient(90deg, #10B981, #06B6D4)"
                  : "linear-gradient(90deg, #F59E0B, #EF4444)",
          }}
        />

        <div className="p-5 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`badge ${status.className}`}>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: status.dot }}
                />
                {status.label}
              </span>
              {roadmap.aiGenerated && (
                <span className="badge badge-ai">
                  <Sparkles size={9} />
                  AI
                </span>
              )}
            </div>

            {/* More menu */}
            <div className="relative flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  background: menuOpen
                    ? "rgba(124, 58, 237, 0.15)"
                    : "rgba(45, 55, 72, 0.3)",
                  color: menuOpen ? "#9F67FF" : "#9CA3AF",
                }}
              >
                <MoreHorizontal size={14} />
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-44 rounded-xl overflow-hidden z-20"
                  style={{
                    background: "rgba(17, 24, 39, 0.98)",
                    border: "1px solid rgba(45, 55, 72, 0.6)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  {[
                    {
                      icon: ExternalLink,
                      label: "Open Roadmap",
                      color: "#F9FAFB",
                    },
                    {
                      icon: roadmap.status === "active" ? Pause : Play,
                      label:
                        roadmap.status === "active"
                          ? "Pause Learning"
                          : "Resume Learning",
                      color: "#F9FAFB",
                    },
                    { icon: Trash2, label: "Delete Roadmap", color: "#EF4444" },
                  ].map((item) => (
                    <button
                      key={`menu-${roadmap.id}-${item.label}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors"
                      style={{ color: item.color }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(45, 55, 72, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <item.icon size={13} />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Title & description */}
          <h3
            className="text-base font-semibold leading-snug mb-1.5"
            style={{ color: "#F9FAFB" }}
          >
            {roadmap.title}
          </h3>
          <p
            className="text-xs leading-relaxed mb-4 flex-1"
            style={{
              color: "#9CA3AF",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {roadmap.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {roadmap.tags.slice(0, 3).map((tag) => (
              <span
                key={`tag-${roadmap.id}-${tag}`}
                className="text-xs px-2 py-0.5 rounded-md font-medium"
                style={{
                  background: "rgba(45, 55, 72, 0.5)",
                  color: "#9CA3AF",
                  border: "1px solid rgba(45, 55, 72, 0.5)",
                }}
              >
                {tag}
              </span>
            ))}
            {roadmap.tags.length > 3 && (
              <span
                className="text-xs px-2 py-0.5 rounded-md font-medium"
                style={{
                  background: "rgba(45, 55, 72, 0.3)",
                  color: "#6B7280",
                }}
              >
                +{roadmap.tags.length - 3}
              </span>
            )}
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-xs font-medium"
                style={{ color: "#9CA3AF" }}
              >
                {roadmap.completedTasks}/{roadmap.totalTasks} tasks
              </span>
              <span
                className="text-xs font-bold mono"
                style={{
                  color: roadmap.progress === 100 ? "#10B981" : "#9F67FF",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {roadmap.progress}%
              </span>
            </div>
            <div className="progress-bar-bg h-1.5">
              <motion.div
                className="progress-bar-fill h-1.5"
                initial={{ width: 0 }}
                animate={{ width: `${roadmap.progress}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                style={{
                  background:
                    roadmap.progress === 100
                      ? "linear-gradient(90deg, #10B981, #06B6D4)"
                      : "linear-gradient(90deg, #7C3AED, #9F67FF)",
                }}
              />
            </div>
          </div>

          {/* Meta row */}
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid rgba(45, 55, 72, 0.4)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-1"
                style={{ color: "#6B7280" }}
              >
                <BookOpen size={11} />
                <span className="text-xs">{roadmap.totalWeeks}w</span>
              </div>
              <div
                className="flex items-center gap-1"
                style={{ color: "#6B7280" }}
              >
                <Clock size={11} />
                <span className="text-xs">{roadmap.weeklyHours}h/wk</span>
              </div>
              {roadmap.streak > 0 && (
                <div
                  className="flex items-center gap-1"
                  style={{ color: "#F59E0B" }}
                >
                  <Flame size={11} />
                  <span className="text-xs font-medium">{roadmap.streak}</span>
                </div>
              )}
              {roadmap.status === "completed" && (
                <CheckCircle2 size={13} style={{ color: "#10B981" }} />
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: skillColor }}
              />
              <span className="text-xs" style={{ color: skillColor }}>
                {roadmap.skillLevel}
              </span>
            </div>
          </div>

          {/* Last activity */}
          <p className="text-xs mt-2" style={{ color: "#4B5563" }}>
            Last activity: {roadmap.lastActivity}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default RoadmapCard;

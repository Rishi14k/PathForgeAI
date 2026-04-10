import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  MoreHorizontal,
  ExternalLink,
  Trash2,
  Pause,
  Play,
  BookOpen,
  Clock,
  Flame,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";

const statusConfig = {
  active: {
    className: "badge-active",
    dotColor: "bg-[#10B981]",
  },
  archived: {
    className: "badge-paused",
    dotColor: "bg-[#F59E0B]",
  },
  completed: {
    className: "badge-completed",
    dotColor: "bg-[#9F67FF]",
  },
};
const skillLevelColor = {
  beginner: "#10B981",
  intermediate: "#F59E0B",
  advanced: "#EF4444",
};

const RoadmapCard = ({ roadmap }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const currentStatus = statusConfig[roadmap.status] || statusConfig.active;
  const streak =
    useSelector((state) => state.dashboard.data?.data?.streak) || 0;

  const statusColor =
    roadmap.status === "completed"
      ? "linear-gradient(90deg, #7C3AED, #9F67FF)"
      : roadmap.status === "active"
        ? "linear-gradient(90deg, #10B981, #06B6D4)"
        : "linear-gradient(90deg, #F59E0B, #EF4444)";

  const skillColor = skillLevelColor[roadmap?.skillLevel] || "#9CA3AF";

  return (
    <Link to={`/dashboard/roadmap/${roadmap._id}`} className="block">
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        className="roadmap-card-hover rounded-2xl flex flex-col cursor-pointer relative"
        style={{
          background: "rgba(17, 24, 39, 0.85)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
          overflow: "hidden",
        }}
      >
        {/* Top Accent Line */}
        <div className="h-0.5 w-full" style={{ background: statusColor }} />

        <div className="p-5 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`badge ${currentStatus.className}`}>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${currentStatus.dotColor}`}
                />
                {roadmap.status}
              </span>
              {roadmap?.aiProvider === "gemini" && (
                <span className="badge badge-ai">
                  <Sparkles size={9} />
                  AI
                </span>
              )}
            </div>
            {/* Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(!menuOpen);
                }}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(45,55,72,0.3)",
                  color: "#9CA3AF",
                }}
              >
                <MoreHorizontal size={14} />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-1 w-44 rounded-xl z-20"
                  style={{
                    background: "rgba(17,24,39,0.98)",
                    border: "1px solid rgba(45,55,72,0.6)",
                  }}
                >
                  {[
                    { icon: ExternalLink, label: "Open" },
                   
                    // {
                    //   icon: Trash2,
                    //   label: "Delete",
                    //   color: "#EF4444",
                    // },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        navigate(`/dashboard/roadmap/${roadmap._id}`);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm"
                      style={{ color: item.color || "#F9FAFB" }}
                    >
                      <item.icon size={13} />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-base font-semibold mb-2"
            style={{ color: "#F9FAFB" }}
          >
            {roadmap.goal}
          </h3>

          {/* Description */}
          <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>
            Personalized learning roadmap generated for your development
            journey.
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {roadmap?.learningStyles &&
              roadmap?.learningStyles.map((tag) => (
                <span
                  key={`tag-${roadmap._id}-${tag}`}
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
            {roadmap?.learningStyles && roadmap?.learningStyles.length > 3 && (
              <span
                className="text-xs px-2 py-0.5 rounded-md font-medium"
                style={{
                  background: "rgba(45, 55, 72, 0.3)",
                  color: "#6B7280",
                }}
              >
                +{roadmap?.learningStyles.length - 3}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {roadmap?.resourcePreferences &&
              roadmap?.resourcePreferences.map((tag) => (
                <span
                  key={`tag-${roadmap._id}-${tag}`}
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
            {roadmap?.resourcePreferences &&
              roadmap?.resourcePreferences.length > 3 && (
                <span
                  className="text-xs px-2 py-0.5 rounded-md font-medium"
                  style={{
                    background: "rgba(45, 55, 72, 0.3)",
                    color: "#6B7280",
                  }}
                >
                  +{roadmap?.resourcePreferences.length - 3}
                </span>
              )}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-xs font-medium"
                style={{ color: "#9CA3AF" }}
              >
                {roadmap?.progress?.completedTasks}/
                {roadmap?.progress?.totalTasks} tasks
              </span>
              <span
                className="text-xs font-bold mono"
                style={{
                  color:
                    roadmap?.progress?.progressPercent === 100
                      ? "#10B981"
                      : "#9F67FF",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {roadmap?.progress?.progressPercent}%
              </span>
            </div>
            <div className="progress-bar-bg h-1.5">
              <motion.div
                className="progress-bar-fill h-1.5"
                initial={{ width: 0 }}
                animate={{ width: `${roadmap?.progress?.progressPercent}%` }}
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

          {/* Meta Info */}
          <div
            className="flex items-center justify-between pt-3"
            style={{
              borderTop: "1px solid rgba(45,55,72,0.4)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#6B7280]">
                <BookOpen size={11} />
                <span className="text-xs">{roadmap.durationWeeks}w</span>
              </div>

              <div className="flex items-center gap-1 text-[#6B7280]">
                <Clock size={11} />
                <span className="text-xs">{roadmap.dailyStudyTime}h/day</span>
              </div>

              {streak > 0 && (
                <div
                  className="flex items-center gap-1"
                  style={{ color: "#F59E0B" }}
                >
                  <Flame size={11} />
                  <span className="text-xs font-medium">{streak}</span>
                </div>
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

          {/* Created Date */}
          <p className="text-xs mt-2" style={{ color: "#4B5563" }}>
            Created: {new Date(roadmap.createdAt).toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default RoadmapCard;

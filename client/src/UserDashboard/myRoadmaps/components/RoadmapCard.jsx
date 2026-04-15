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
    <Link to={`/dashboard/roadmap/${roadmap?._id}`} className="block group">
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative rounded-3xl flex flex-col cursor-pointer overflow-hidden transition-all duration-300"
        style={{
          background: "rgba(17, 24, 39, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)",
        }}
      >
        {/* 1. Animated Accent Line */}
        <div
          className="h-1 w-full opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ background: statusColor }}
        />

        {/* 2. Background Decor (Subtle Glow) */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-violet-600/10 blur-[80px] group-hover:bg-violet-600/20 transition-all duration-500" />

        <div className="p-6 flex flex-col flex-1 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`badge flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentStatus.className} border border-white/5`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentStatus.dotColor}`}
                />
                {roadmap.status}
              </span>

              {roadmap?.aiProvider === "gemini" && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <Sparkles size={10} className="animate-pulse" />
                  AI Generated
                </span>
              )}
            </div>

            {/* Menu Button */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(!menuOpen);
                }}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 hover:text-white transition-all border border-transparent hover:border-white/10"
                style={{
                  background: "rgba(45,55,72,0.3)",
                  color: "#9CA3AF",
                }}
              >
                <MoreHorizontal size={16} />
              </button>

              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 rounded-2xl z-20 shadow-2xl backdrop-blur-xl border border-white/10 p-1.5"
                  style={{ background: "rgba(10, 15, 25, 0.98)" }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      navigate(`/dashboard/roadmap/${roadmap._id}`);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors text-white"
                  >
                    <ExternalLink size={14} className="text-violet-400" />
                    View Roadmap
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <h3
            className="text-lg font-bold mb-2 tracking-tight leading-tight group-hover:text-violet-400 transition-colors"
            style={{ color: "#F9FAFB" }}
          >
            {roadmap.goal}
          </h3>
          <p
            className="text-xs leading-relaxed mb-5 font-medium"
            style={{ color: "#9CA3AF" }}
          >
            Custom-built path identifying high-growth milestones for your
            specific trajectory.
          </p>

          {/* Tags Section with refined styling */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              ...(roadmap?.learningStyles || []),
              ...(roadmap?.resourcePreferences || []),
            ]
              .slice(0, 4)
              .map((tag, idx) => (
                <span
                  key={`${roadmap._id}-${tag}-${idx}`}
                  className="text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wide border transition-colors group-hover:border-white/20"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    color: "#9CA3AF",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {tag}
                </span>
              ))}
            {(roadmap?.learningStyles?.length || 0) +
              (roadmap?.resourcePreferences?.length || 0) >
              4 && (
              <span className="text-[10px] px-2 py-1 text-[#6B7280] font-bold">
                +
                {roadmap.learningStyles.length +
                  roadmap.resourcePreferences.length -
                  4}{" "}
                More
              </span>
            )}
          </div>

          {/* Progress Section */}
          <div className="mb-6 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Progress{" "}
                <span className="text-gray-300 ml-1">
                  {roadmap?.progress?.completedTasks}/
                  {roadmap?.progress?.totalTasks}
                </span>
              </span>
              <span
                className="text-xs font-black"
                style={{
                  color:
                    roadmap?.progress?.progressPercent === 100
                      ? "#10B981"
                      : "#A855F7",
                }}
              >
                {roadmap?.progress?.progressPercent}%
              </span>
            </div>
            <div className="bg-white/5 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${roadmap?.progress?.progressPercent}%` }}
                transition={{
                  delay: 0.3,
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background:
                    roadmap.progress?.progressPercent === 100
                      ? "linear-gradient(90deg, #10B981, #34D399)"
                      : "linear-gradient(90deg, #6366F1, #A855F7)",
                  boxShadow:
                    roadmap.progress?.progressPercent > 0
                      ? "0 0 10px rgba(168, 85, 247, 0.4)"
                      : "none",
                }}
              />
            </div>
          </div>

          {/* Footer Meta */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-200 transition-colors">
                <BookOpen size={12} className="text-violet-500/70" />
                <span className="text-[11px] font-bold">
                  {roadmap.durationWeeks}w
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-200 transition-colors">
                <Clock size={12} className="text-violet-500/70" />
                <span className="text-[11px] font-bold">
                  {roadmap.dailyStudyTime}h/d
                </span>
              </div>
              {streak > 0 && (
                <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                  <Flame size={12} />
                  <span className="text-[11px] font-bold">{streak}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: skillColor }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: skillColor }}
              >
                {roadmap.skillLevel}
              </span>
            </div>
          </div>

          {/* Creation Date - Tucked away but accessible */}
          <div className="mt-4 text-[9px] uppercase tracking-widest text-gray-600 font-bold">
            Ref:{" "}
            {new Date(roadmap.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RoadmapCard;

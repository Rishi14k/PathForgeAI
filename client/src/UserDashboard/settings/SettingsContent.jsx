import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  ShieldCheck,
  Flame,
  Map,
  Calendar,
  Zap,
  Loader2,
  Trophy,
} from "lucide-react";
import { achievementMeta } from "../progress/achivementMeta";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function SettingsContent() {
  // Pulling the user data from your Redux auth state
  const { user, isLoading } = useSelector((state) => state.auth);

  const { achievements, loading: progressLoading } = useSelector(
    (state) => state.progress,
  );

  // Enrich achievements: Only keeping those where achieved: true
  const unlockedAchievements =
    achievements
      ?.filter((a) => a.earned === true)
      .map((a) => ({
        ...a,
        ...(achievementMeta[a.id] || {}),
      })) || [];

  if (progressLoading || !user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-accent" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (!user) return null;

  /* ---------- reusable styles ---------- */
  const sectionCard = (children) => (
    <div
      className="rounded-2xl p-5 lg:p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );

  const infoRow = (label, value, icon) => (
    <div className="flex flex-col space-y-1 py-2">
      <span
        style={{
          color: "var(--text-secondary)",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2">
        {icon && <span style={{ color: "var(--text-muted)" }}>{icon}</span>}
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {value || "N/A"}
        </span>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={sectionVariants}>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          Account Details
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Overview of your PathForgeAI profile and usage
        </p>
      </motion.div>

      {/* ================= USAGE STATS ================= */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {sectionCard(
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(249, 115, 22, 0.1)" }}
            >
              <Flame size={24} className="text-orange-500" />
            </div>
            <div>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Current Streak
              </p>
              <p
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {user.streak?.currentStreak || 0} Days
              </p>
            </div>
          </div>,
        )}
        {sectionCard(
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(59, 130, 246, 0.1)" }}
            >
              <Map size={24} className="text-blue-500" />
            </div>
            <div>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Roadmaps Generated
              </p>
              <p
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {user.roadmapGenerated || 0}
              </p>
            </div>
          </div>,
        )}
      </motion.div>

      {/* ================= PROFILE INFO ================= */}
      <motion.div variants={sectionVariants}>
        {sectionCard(
          <>
            <div className="flex items-center gap-3 mb-6">
              <User size={18} className="text-accent" />
              <h2
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {infoRow("Display Name", user.name)}
              {infoRow("Email Address", user.email, <Mail size={14} />)}
              {infoRow(
                "Account Created",
                new Date(user.createdAt).toLocaleDateString(),
                <Calendar size={14} />,
              )}
              {infoRow(
                "Email Status",
                user.isEmailVerified ? "Verified" : "Unverified",
                <ShieldCheck
                  size={14}
                  className={
                    user.isEmailVerified ? "text-green-500" : "text-red-500"
                  }
                />,
              )}
            </div>
          </>,
        )}
      </motion.div>

      <motion.div variants={sectionVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={18} className="text-yellow-500" />
          <h2
            className="font-bold text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            Achievements ({unlockedAchievements.length})
          </h2>
        </div>

        {unlockedAchievements.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {unlockedAchievements.map((ach, index) => {
              const Icon = ach.icon || Trophy;
              return (
                <motion.div
                  key={ach.id || index}
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-2xl flex flex-col items-center text-center space-y-2 border"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${ach.color}15` }} // 15% opacity for bg
                  >
                    <Icon size={24} style={{ color: ach.color }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold leading-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {ach.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div
            className="p-8 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <Trophy
              size={32}
              className="mb-2 opacity-20"
              style={{ color: "var(--text-muted)" }}
            />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No achievements yet. Start a roadmap to unlock your first trophy!
            </p>
          </div>
        )}
      </motion.div>

      {/* ================= SUBSCRIPTION / PLAN ================= */}
      <motion.div variants={sectionVariants}>
        {sectionCard(
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-purple-500" />
              <div>
                <h2
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Current Plan
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Next roadmap reset:{" "}
                  {new Date(user.roadmapResetDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase"
              style={{
                background: "var(--accent-dim)",
                color: "var(--accent-light)",
              }}
            >
              {user.planType}
            </span>
          </div>,
        )}
      </motion.div>
    </motion.div>
  );
}

export default SettingsContent;

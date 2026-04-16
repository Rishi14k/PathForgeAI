import { Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const WelcomeHero = () => {
  const streak =
    useSelector((state) => state.dashboard.data?.data?.streak) || 0;
  const taskComp =
    useSelector((state) => state.dashboard.data?.data?.completedTasks) || 0;

  const user = useSelector((state) => state.auth.user);

  const planType = user?.planType || "free";
  const roadmapGenerated = user?.roadmapGenerated || 0;
  const discoveryGenerated = user?.discoveryGenerated || 0;

  const PLAN_LIMITS = {
    free: {
      roadmap: 1,
      discovery: 2,
    },
    pro: {
      roadmap: "Unlimited",
      discovery: "Unlimited",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl px-8 py-10"
      style={{
        background:
          "linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(159, 103, 255, 0.08) 40%, rgba(11, 15, 25, 0.6) 100%)",
        border: "1px solid rgba(124, 58, 237, 0.25)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Decorative glow blobs */}
      <div
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(124, 58, 237, 0.12)" }}
      />
      <div
        className="absolute -bottom-12 right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(159, 103, 255, 0.08)" }}
      />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(124,58,237,0.15) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          {/* Streak badge */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#F59E0B",
              }}
            >
              <Flame size={13} />
              <span>{streak || 0}-day streak active</span>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(124, 58, 237, 0.15)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                color: "#9F67FF",
              }}
            >
              <Zap size={13} />
              <span>AI Roadmap Active</span>
            </div>
          </div>

          <h2
            className="text-3xl lg:text-4xl font-bold leading-tight"
            style={{ color: "#F9FAFB" }}
          >
            Welcome to{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #7C3AED, #9F67FF, #C084FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SkillOrbit
            </span>
          </h2>
          <p className="mt-2 text-base" style={{ color: "#9CA3AF" }}>
            Continue building your learning orbit. You have completed{" "}
            <strong style={{ color: "#C084FC" }}>{taskComp || 0} tasks.</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard/create-roadmap">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary px-5 py-2.5 text-sm font-semibold flex items-center gap-2"
            >
              <Zap size={15} />
              Generate Roadmap
            </motion.button>
          </Link>
          <Link to="/dashboard/my-roadmaps">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary px-5 py-2.5 text-sm font-semibold"
            >
              View All Roadmaps
            </motion.button>
          </Link>
        </div>

        {/* PLAN STATUS */}
      </div>

     <div
  className="mt-6 rounded-2xl p-5 relative overflow-hidden"
  style={{
    background:
      "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(15,23,42,0.7))",
    border: "1px solid rgba(124,58,237,0.35)",
    backdropFilter: "blur(10px)",
  }}
>
  {/* glow */}
  <div
    className="absolute -right-12 -top-12 w-40 h-40 blur-3xl rounded-full"
    style={{ background: "rgba(124,58,237,0.18)" }}
  />


  {/* HEADER */}
  <div className="flex items-center justify-between mb-4">
    <div>
      <p className="text-xs text-gray-400">Your Current Plan</p>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        ⚡ {planType === "paid" ? "Pro Plan" : "Free Plan"}
      </h3>
    </div>

    <span
      className="text-xs px-3 py-1 rounded-full font-semibold"
      style={{
        background:
          planType === "paid"
            ? "rgba(34,197,94,0.18)"
            : "rgba(245,158,11,0.18)",
        color: planType === "paid" ? "#22C55E" : "#F59E0B",
      }}
    >
      {planType.toUpperCase()}
    </span>
  </div>

  {/* FREE PLAN USAGE */}
  {planType === "free" ? (
    <div className="space-y-4">
      {/* Roadmap Progress */}
      <div>
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>AI Roadmaps</span>
          <span>
            {roadmapGenerated}/{PLAN_LIMITS.free.roadmap}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${
                (roadmapGenerated / PLAN_LIMITS.free.roadmap) * 100
              }%`,
              background:
                "linear-gradient(90deg,#7C3AED,#9F67FF)",
            }}
          />
        </div>
      </div>

      {/* Discover Progress */}
      <div>
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Discover Mode</span>
          <span>
            {discoveryGenerated}/{PLAN_LIMITS.free.discovery}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${
                (discoveryGenerated / PLAN_LIMITS.free.discovery) * 100
              }%`,
              background:
                "linear-gradient(90deg,#C084FC,#7C3AED)",
            }}
          />
        </div>
      </div>

      {/* Upgrade CTA */}
      {/* <div className="pt-2">
        <Link to="/pricing">
          <button className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg,#7C3AED,#9F67FF)",
              color: "#fff",
            }}
          >
            Unlock Unlimited Learning
          </button>
        </Link>
      </div> */}

{/*       
      {planType === "free" && (
        <Link to="/pricing">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary mt-6 cursor-pointer  px-5 py-2.5 text-sm font-semibold"
          >
            Upgrade Plan
          </motion.button>
        </Link>
      )} */}
    </div>
  ) : (
    <div className="text-sm text-green-500">
      Unlimited roadmap generation and discovery access enabled
    </div>
  )}
</div>

    </motion.div>
  );
};

export default WelcomeHero;

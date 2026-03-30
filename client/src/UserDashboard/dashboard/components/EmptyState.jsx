import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Orbit, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-3xl"
      style={{
        background: "rgba(17, 24, 39, 0.5)",
        border: "1px solid rgba(45, 55, 72, 0.4)",
        borderStyle: "dashed",
      }}
    >
      <div className="relative mb-8">
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center float-animation"
          style={{
            background:
              "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(159, 103, 255, 0.1))",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            boxShadow: "0 0 40px rgba(124, 58, 237, 0.2)",
          }}
        >
          <Orbit size={52} style={{ color: "#7C3AED" }} />
        </div>
        {/* Orbiting sparkles */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={18} style={{ color: "#9F67FF" }} />
        </motion.div>
      </div>
      <h3 className="text-2xl font-bold mb-3" style={{ color: "#F9FAFB" }}>
        Your learning journey starts here.
      </h3>
      <p
        className="text-base max-w-md mb-8"
        style={{ color: "#9CA3AF", lineHeight: "1.6" }}
      >
        Tell SkillOrbit what you want to learn and our AI will generate a
        personalized week-by-week roadmap with curated resources and projects.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/create-roadmap">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            <Sparkles size={16} />
            Generate Your First Roadmap
            <ArrowRight size={15} />
          </motion.button>
        </Link>
      </div>
      <p className="mt-5 text-xs" style={{ color: "#4B5563" }}>
        Takes about 30 seconds · Fully customizable · AI-powered
      </p>
    </motion.div>
  );
};

export default EmptyState;

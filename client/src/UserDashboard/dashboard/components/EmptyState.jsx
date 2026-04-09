import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Orbit, Sparkles, Compass, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col items-center text-center py-20 px-8 rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(17,24,39,0.7), rgba(17,24,39,0.4))",
        border: "1px dashed rgba(139,92,246,0.3)",
      }}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-violet-600/10 blur-[120px] rounded-full -top-20 left-1/2 -translate-x-1/2" />
      </div>

      {/* Icon */}
      <div className="relative mb-8">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="w-28 h-28 rounded-3xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(159,103,255,0.1))",
            boxShadow: "0 0 50px rgba(124,58,237,0.25)",
          }}
        >
          <Orbit size={54} className="text-violet-400" />
        </motion.div>

        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={18} className="text-violet-300" />
        </motion.div>
      </div>

      {/* Headline */}
      <h2 className="text-3xl font-bold text-white mb-3">
        Build Your Personalized Learning Path
      </h2>

      {/* Description */}
      <p className="text-gray-400 max-w-md leading-relaxed mb-10">
        Tell SkillOrbit what you want to achieve — our AI creates a structured,
        week-by-week roadmap tailored to your goals, learning style, and pace.
      </p>

      {/* Primary CTA */}
      <Link to="/dashboard/create-roadmap" className="w-full max-w-sm">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold
      bg-gradient-to-r from-violet-600 to-purple-600
      hover:from-violet-500 hover:to-purple-500
      shadow-lg shadow-violet-600/20 transition-all"
        >
          <Sparkles size={16} />
          Generate Your First Roadmap
          <ArrowRight size={15} />
        </motion.button>
      </Link>

      {/* Secondary Action */}
      <motion.div
        whileHover={{ y: -3 }}
        className="mt-8 bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6 max-w-sm"
      >
        <div className="flex gap-4 text-left">
          <div className="bg-violet-500/20 p-2 rounded-lg">
            <HelpCircle size={20} className="text-violet-400" />
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-1">
              Not sure what to learn?
            </h4>

            <p className="text-gray-400 text-xs mb-3">
              Our AI analyzes your interests, thinking style, and goals to
              suggest the perfect career path.
            </p>

            <Link to="/dashboard/discovery">
              <motion.button
                whileHover={{ x: 4 }}
                className="text-violet-400 text-xs font-bold flex items-center gap-1"
              >
                Start Career Discovery
                <Compass size={14} />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Trust Indicators */}
      <div className="flex gap-6 mt-10 text-xs text-gray-500">
        <span>⚡ 30 sec setup</span>
        <span>🧠 AI-Personalized</span>
        <span>🎯 Goal-Focused</span>
      </div>
    </motion.div>
  );
};

export default EmptyState;

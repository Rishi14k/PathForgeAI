import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Sparkles, ArrowRight } from "lucide-react";

const GhostOverlay = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        absolute inset-0 z-20
        flex items-center justify-center
        px-4 sm:px-6
      "
    >
      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-violet-500/20 blur-3xl rounded-full" />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.96, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          relative
          w-full max-w-md
          rounded-2xl
          border border-gray-700
          bg-[#111827]/70
          backdrop-blur-xl
          shadow-2xl
          p-6 sm:p-8
          text-center
        "
      >
        {/* Lock Icon */}
        <div className="flex justify-center mb-5">
          <div className="
            w-14 h-14
            rounded-full
            bg-violet-500/10
            flex items-center justify-center
          ">
            <Lock size={26} className="text-violet-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
          Your Progress Dashboard Awaits
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
          Complete your first roadmap task to unlock progress tracking,
          streaks, achievements, and growth insights.
        </p>

        {/* Benefits */}
        <div className="text-xs sm:text-sm text-gray-500 space-y-1 mb-7">
          <p>✓ Track daily learning streaks</p>
          <p>✓ Visualize your growth</p>
          <p>✓ Unlock achievements</p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/dashboard/discovery")}
          className="
            w-full sm:w-auto
            inline-flex items-center justify-center gap-2
            bg-violet-600 hover:bg-violet-700
            px-6 py-3
            rounded-xl
            font-semibold text-white
            transition-all
            hover:scale-[1.02]
            active:scale-[0.97]
            shadow-lg shadow-violet-500/20
          "
        >
          <Sparkles size={16} />
          Start Learning
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GhostOverlay;
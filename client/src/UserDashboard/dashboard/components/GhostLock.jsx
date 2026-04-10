import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const GhostLock = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        absolute inset-0
        flex flex-col items-center justify-center
        gap-3
        z-20
        pointer-events-none
      "
    >
      {/* Glow Circle */}
      <div className="relative">
        <div className="absolute inset-0 bg-violet-500/20 blur-2xl rounded-full" />

        <div
          className="
          relative
          w-14 h-14
          rounded-full
          bg-[#111827]
          border border-gray-700
          flex items-center justify-center
          shadow-lg
        "
        >
          <Lock size={24} className="text-violet-400 animate-pulse" />
        </div>
      </div>

      {/* Message */}
      <p className="text-gray-300 text-sm font-medium text-center max-w-xs">
        Stats unlock after creating your first roadmap
      </p>
    </motion.div>
  );
};

export default GhostLock;

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Crown, Check } from "lucide-react";

const UpgradeModal = ({ open, onClose, onUpgrade }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#020617] p-8 border border-white/10 shadow-2xl"
          >
            {/* Glow Effect */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <div className="w-28 h-28 bg-indigo-500/20 blur-3xl rounded-full" />
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-2xl bg-indigo-500/10">
                <Crown className="text-indigo-400" size={30} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-white mb-2">
              Unlock Pro Access
            </h2>

            <p className="text-gray-400 text-center mb-6">
              You've reached your free roadmap limit.
              Upgrade to continue generating unlimited AI roadmaps.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {[
                "Unlimited AI Roadmaps",
                "Unlimited Career Discovery",
                "Faster AI Generation",
                "Future Premium Features",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={16} className="text-indigo-400" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onUpgrade}
              className="w-full py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 transition-all text-white flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              Upgrade to Pro
            </button>

            {/* Secondary */}
            <button
              onClick={onClose}
              className="mt-4 w-full text-sm text-gray-500 hover:text-gray-300 transition"
            >
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
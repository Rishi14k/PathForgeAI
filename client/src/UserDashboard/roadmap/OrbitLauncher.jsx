import { useEffect, useState } from "react";
import OrbitChat from "./OrbitChat";
import { Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


function OrbitLauncher({ userId, roadmapId }) {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 3000); // show after 4s

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    setShowHint(false);
  };

  return (
    <>
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-6 z-50
            bg-[#0b0b13] text-white
            border border-purple-500/30
            px-4 py-3 rounded-xl
            shadow-xl text-sm max-w-[220px]"
          >
            👋 Need help with your roadmap?
            <br />
            Ask Orbit Agent anytime.
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-purple-600 hover:bg-purple-700
        flex items-center justify-center
        shadow-xl"
      >
        <Bot className="text-white" />
      </button>

      {open && (
        <OrbitChat
          userId={userId}
          roadmapId={roadmapId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default OrbitLauncher;

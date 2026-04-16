import { useState } from "react";
import OrbitChat from "./OrbitChat";
import { Bot } from "lucide-react";

function OrbitLauncher({ userId, roadmapId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
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

export default OrbitLauncher
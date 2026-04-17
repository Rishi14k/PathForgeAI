import { useEffect, useRef, useState } from "react";
import {
  initOrbitAgent,
  sendAgentMessage,
  listenAgentEvents,
  disconnectAgent,
} from "../../services/orbitAgent";
import AIMessage from "./AImessage";
import { fetchAgentHistory } from "../../apis/dashboardApi";

function OrbitChat({ userId, roadmapId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const bottomRef = useRef(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoadingHistory(true);

        const history = await fetchAgentHistory(roadmapId);

        setMessages(history);
      } catch (err) {
        console.error("History load failed", err);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadHistory();
  }, [roadmapId]);

  /* =====================
      CONNECT SOCKET
  ===================== */

  useEffect(() => {
    if (loadingHistory) return;

    initOrbitAgent(userId, roadmapId);

    listenAgentEvents({
      onReady: () => console.log("Orbit ready"),

      onToken: (token) => {
        setIsThinking(false);

        setMessages((prev) => {
          const last = prev[prev.length - 1];

          if (last?.role === "assistant") {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...last,
              content: last.content + token,
            };
            return updated;
          }

          return [...prev, { role: "assistant", content: token }];
        });
      },

      onDone: () => {
        setIsThinking(false);
      },

      onError: () => {
        setIsThinking(false);
      },
    });

    return () => disconnectAgent();
  }, [userId, roadmapId, loadingHistory]);

  //auto scroll

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* =====================
        SEND MESSAGE
  ===================== */

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setIsThinking(true); // ⭐ SHOW THINKING

    sendAgentMessage(userMessage);

    setInput("");
  };

  const ThinkingMessage = () => {
    return (
      <div className="bg-white/10 text-gray-300 px-4 py-3 rounded-xl w-fit flex items-center gap-2">
        <span className="text-purple-400">🤖</span>

        <span className="flex gap-1">
          <span className="animate-bounce [animation-delay:-0.3s]">.</span>
          <span className="animate-bounce [animation-delay:-0.15s]">.</span>
          <span className="animate-bounce">.</span>
        </span>

        <span className="ml-1 text-gray-400">thinking</span>
      </div>
    );
  };

  /* =====================
        UI
  ===================== */

  return (
    <div
      className="fixed z-50 flex flex-col shadow-2xl bg-[#0b0b13] border border-purple-500/20 transition-all duration-300
    /* Mobile styles: Bottom-aligned sheet */
    bottom-0 left-0 right-0 
    w-full h-[80%] rounded-t-2xl
    /* Desktop styles: Floating window (sm breakpoint and up) */
    sm:bottom-24 sm:right-6 sm:left-auto 
    sm:w-[360px] sm:h-[520px] sm:rounded-2xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-white font-semibold">Orbit Agent</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1"
        >
          ✕ 
        </button>
      </div>

      {loadingHistory && (
        <div className="p-2 text-center text-gray-400 text-sm animate-pulse">
          Loading conversation...
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl text-sm max-w-[85%] overflow-hidden ${
              msg.role === "user"
                ? "bg-purple-600 text-white ml-auto"
                : "bg-white/10 text-gray-200"
            }`}
          >
            {msg.role === "assistant" ? (
              <AIMessage content={msg.content} />
            ) : (
              msg.content
            )}
          </div>
        ))}

        {isThinking && <ThinkingMessage />}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10 flex gap-2 bg-[#0b0b13] pb-safe">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Orbit anything..."
          className="flex-1 bg-black/40 text-white p-2 rounded-lg outline-none border border-white/5 focus:border-purple-500/50"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-purple-600 px-4 py-2 rounded-lg text-white font-medium active:scale-95 transition-transform"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default OrbitChat;

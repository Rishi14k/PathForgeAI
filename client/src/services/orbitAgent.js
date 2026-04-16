import { io } from "socket.io-client";

let socket = null;

export const initOrbitAgent = (userId, roadmapId) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_API_KEY_BASE_URL_AGENT, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Orbit Agent Connected");

    socket.emit("agent:init", userId, roadmapId);
  });

  return socket;
};

export const sendAgentMessage = (message) => {
  if (!socket) return;
  socket.emit("agent:message", { message });
};

export const listenAgentEvents = (handlers) => {
  if (!socket) return;

  // 🔥 remove old listeners (CRITICAL)
  socket.off("agent:ready");
  socket.off("agent:token");
  socket.off("agent:done");
  socket.off("agent:error");

  socket.on("agent:ready", handlers.onReady);
  socket.on("agent:token", handlers.onToken);
  socket.on("agent:done", handlers.onDone);
  socket.on("agent:error", handlers.onError);
};

export const disconnectAgent = () => {
  if (!socket) return;

  socket.disconnect();
  socket = null;
};
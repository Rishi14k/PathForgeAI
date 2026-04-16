const { buildAgentSystemPrompt } = require("../services/contextService");
const {
  getOrCreateConversation,
  addMessage,
} = require("../services/conversation");
const { streamGemmaResponse } = require("../services/openrouterService");

const registerAgentSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Agent connected:", socket.id);

    socket.on("agent:init", async (userId, roadmapId) => {
      try {
        socket.userId = userId;
        socket.roadmapId = roadmapId;

        await getOrCreateConversation(userId, roadmapId);

        // socket.conversationId = conversation._id;

        socket.emit("agent:ready");
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("agent:message", async ({ message }) => {
      try {
        if (!socket.userId || !socket.roadmapId)
          return socket.emit("agent:error", "Agent not initialized");

        const conversation = await getOrCreateConversation(
          socket.userId,
          socket.roadmapId,
        );

        await addMessage(conversation, "user", message);

        // build context
        // socket.context = await buildRoadmapContext(socket.roadmapId);
        // const systemPrompt = socket.context;

        const systemPrompt = buildAgentSystemPrompt();


        const history = conversation.messages.slice(-8).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        // 🔥 call AI
        let assistantReply = await streamGemmaResponse({
          systemPrompt,
          history,
          userMessage: message,
          socket,
        });

        console.log("AI FINAL REPLY:", assistantReply);

        if (assistantReply?.trim()) {
          await addMessage(conversation, "assistant", assistantReply);
        }

        if (!assistantReply.trim()) {
          assistantReply = "I'm here — try asking that again.";
        }
      } catch (err) {
        console.error(err);
        socket.emit("agent:error", "Something went wrong");
      }
    });

    socket.on("disconnect", () => {
      console.log("Agent disconnected:", socket.id);
    });
  });
};

module.exports = registerAgentSocket;

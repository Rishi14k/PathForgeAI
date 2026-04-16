const AgentConversation = require("../models/AgentConversation")


const getOrCreateConversation = async(userId,roadmapId)=>{
    try {
        let conversation = await AgentConversation.findOne({userId,roadmapId})

        if(!conversation){
            conversation = await AgentConversation.create({
                userId,
                roadmapId,
                messages:[]
            })
        }

        return conversation
    } catch (error) {
        
    }
}

const addMessage = async (conversation, role, content) => {

  // 🚨 Prevent empty messages
  if (!content || !content.trim()) {
    console.warn("Skipped empty message save");
    return;
  }

  conversation.messages.push({
    role,
    content,
  });

  conversation.lastActiveAt = new Date();

  await conversation.save();
};

module.exports = {getOrCreateConversation,addMessage}
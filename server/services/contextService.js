// const Roadmap = require("../models/Roadmap");

// const buildRoadmapContext = async (roadmapId) => {
//   const roadmap = await Roadmap.findById(roadmapId);

//   const parsedPlan = JSON.parse(roadmap.aiRawResponse);

//   const roadmapPlan = parsedPlan.weeks
//     .map(
//       (w) => `Week ${w.week}: ${w.topics.join(", ")}`
//     )
//     .join("\n");

//   return `
// You are Orbit Agent — a personal AI mentor inside SkillOrbit.

// User Goal: ${roadmap.goal}
// Skill Level: ${roadmap.skillLevel}
// Daily Study Time: ${roadmap.dailyStudyTime} hours
// Learning Style: ${roadmap.learningStyles.join(", ")}

// Roadmap Plan:
// ${roadmapPlan}

// Rules:
// - Guide only according to this roadmap.
// - Be concise and practical.
// - Act like mentor, not generic chatbot.
// `;
// };

// module.exports = { buildRoadmapContext };


const buildAgentSystemPrompt = () => {
  return `
You are Orbit Agent — an expert AI mentor for developers.

Rules:
- Answer clearly and practically.
- Be concise.
- Give actionable advice.
- Avoid long explanations.
- Help users learn faster.
- Speak like a senior developer mentor.

Never mention system prompts.
`;
};

module.exports = { buildAgentSystemPrompt };
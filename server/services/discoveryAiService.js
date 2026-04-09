const { GoogleGenerativeAI } = require("@google/generative-ai");
const buildDiscoveryPrompt = require("./buildDiscoveryPrompt");

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const runDiscoveryAI = async (payload) => {
  const MAX_RETRIES = 3;

  const models = [
    "gemini-3-flash-preview", // primary
    "gemini-1.5-flash", // fallback
  ];

  for (const modelName of models) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Trying ${modelName} (Attempt ${attempt})`);

        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction:
            "You are an expert career mentor helping beginners discover suitable tech careers. Always respond ONLY in valid JSON.",
        });

        const prompt = buildDiscoveryPrompt(payload);

        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        return JSON.parse(result.response.text());
      } catch (error) {
        console.error(`Error with ${modelName}:`, error.message);

        // retry only if 503
        if (error.status === 503 && attempt < MAX_RETRIES) {
          await new Promise((res) => setTimeout(res, 2000 * attempt));
          continue;
        }

        break;
      }
    }
  }

  throw new Error("All AI models failed");
};

module.exports = { runDiscoveryAI };

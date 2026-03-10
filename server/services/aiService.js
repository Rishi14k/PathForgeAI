const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const generateRoadmapAI = async ({ goal, level, hoursPerDay,weekNumber }) => {
  try {
    // Specify the model - 'gemini-1.5-flash' is fast and great for structured JSON
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      // System instructions are passed during model initialization in Gemini
      systemInstruction: "You are an expert career mentor and curriculum designer. Generate realistic study plans. Always respond ONLY in JSON format.",
    });

    const prompt = `Create a ${weekNumber}-week roadmap for becoming a ${goal}.
      Level: ${level}
      Daily Study Time: ${hoursPerDay} hours

      Return response strictly in this JSON format:
      {
        "weeks": [
          {
            "week": 1,
            "topics": ["topic1", "topic2"],
            "daily_tasks": ["task1", "task2"],
            "project": "string"
          }
        ]
      }`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        // This ensures the model outputs valid JSON
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const responseText = result.response.text();
    
    // Gemini handles the formatting, so we can parse it directly
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate roadmap");
  }
};

module.exports = { generateRoadmapAI };
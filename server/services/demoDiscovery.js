const buildDiscoveryPrompt = require("./buildDiscoveryPrompt");

// Declare a variable outside the function to cache the SDK
let OpenRouterSDK;

const demorunDiscovery = async (payload) => {
  // Dynamically import the SDK if it hasn't been loaded yet
  if (!OpenRouterSDK) {
    const { OpenRouter } = await import("@openrouter/sdk");
    OpenRouterSDK = OpenRouter;
  }

  // Initialize inside the function
  const openrouter = new OpenRouterSDK({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const MAX_RETRIES = 3;
  const models = ["google/gemini-2.0-flash-001", "google/gemini-flash-1.5"];

  for (const modelName of models) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Trying ${modelName} via OpenRouter (Attempt ${attempt})`);

        const prompt = buildDiscoveryPrompt(payload);
        // Replace the openrouter.chat.send block with this:
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: modelName,
              messages: [
                {
                  role: "system",
                  content:
                    "You are an expert career mentor. Always respond ONLY in valid JSON.",
                },
                { role: "user", content: prompt },
              ],
              response_format: { type: "json_object" },
              temperature: 0.7,
            }),
          },
        );

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        const content = data.choices[0]?.message?.content;

        console.log("ai response",content)

        return JSON.parse(content);
      } catch (error) {
        console.error(`Error with ${modelName}:`, error.message);

        const isRetryable = error.status === 503 || error.status === 429;

        if (isRetryable && attempt < MAX_RETRIES) {
          await new Promise((res) => setTimeout(res, 2000 * attempt));
          continue;
        }
        break;
      }
    }
  }

  throw new Error("All AI models via OpenRouter failed");
};

module.exports = { demorunDiscovery };

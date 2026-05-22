const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const MODELS = [
  "minimax/minimax-m2.5:free",
  "openrouter/elephant-alpha",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-26b-a4b-it:free",
  "openchat/openchat-7b:free",
  "nousresearch/nous-capybara-7b:free",
];

const streamGemmaResponse = async ({
  systemPrompt,
  history,
  userMessage,
  socket,
}) => {
  for (const model of MODELS) {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GEMA_API}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            stream: true,
            messages: [
              { role: "system", content: systemPrompt },
              ...history,
              { role: "user", content: userMessage },
            ],
          }),
        },
      );

      if (!response.ok) {
        const text = await response.text();
        console.log("Model failed:", model, text);
        continue;
      }

      console.log("Using model:", model);

      let finalText = "";

      // 🔥 Check if response is streaming
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("text/event-stream")) {
        // ===== STREAM MODE =====
        for await (const chunk of response.body) {
          const lines = chunk
            .toString()
            .split("\n")
            .filter((l) => l.startsWith("data:"));

          for (const line of lines) {
            const data = line.replace("data:", "").trim();

            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content || "";

              if (token) {
                finalText += token;
                socket.emit("agent:token", token);
              }
            } catch {}
          }
        }
      } else {
        const json = await response.json();

        finalText = json.choices?.[0]?.message?.content || "";

        // simulate streaming
        for (const char of finalText) {
          socket.emit("agent:token", char);
          await new Promise((r) => setTimeout(r, 5));
        }
      }

      setTimeout(() => {
        socket.emit("agent:done");
      }, 20);

      return finalText;
    } catch (err) {
      console.log(`Error with ${model}:`, err.message);
    }
  }

  throw new Error("All models failed");
};

module.exports = { streamGemmaResponse };

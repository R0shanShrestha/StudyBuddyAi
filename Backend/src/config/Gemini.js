const { GoogleGenAI } = require("@google/genai");
const { ApiKey } = require("./ServerConfig");
const ai = new GoogleGenAI({ apiKey: ApiKey });

async function Brain(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

module.exports = Brain;

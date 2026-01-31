import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getHealthInsight = async (metrics: any[]): Promise<string> => {
  if (!apiKey) return "Please configure your API Key to receive personalized AI health insights.";

  try {
    const prompt = `
      You are an elite personal health coach known for concise, motivating, and scientifically accurate advice.
      Analyze the following user health metrics: ${JSON.stringify(metrics)}.
      Provide a single, powerful sentence of insight or motivation. Do not use markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Stay active and hydrated!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Great job tracking your health today!";
  }
};

export const chatWithHealthCoach = async (message: string, history: any[]): Promise<string> => {
  if (!apiKey) return "I can only answer questions if an API Key is provided.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are Aura, a friendly, professional, and empathetic health assistant. Keep answers brief (under 50 words) unless asked for detail. Focus on wellness, nutrition, and fitness."
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm thinking...";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting to the health database right now.";
  }
};

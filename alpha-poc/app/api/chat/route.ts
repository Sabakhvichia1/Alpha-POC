import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Gemini requires the first message to be from the user.
    // If the first message is our automated "welcome" from the model, we filter it out.
    let validMessages = messages;
    if (validMessages.length > 0 && validMessages[0].role === 'model') {
      validMessages = validMessages.slice(1);
    }

    const formattedContents = validMessages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const langInstruction = language === 'ka' 
      ? "You MUST reply entirely in Georgian (ქართული ენა)."
      : "You MUST reply entirely in English.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: `You are Gelamxuti, a helpful AI assistant for the Financial Monitoring platform in Georgia. Your goal is to help users navigate the website, explain features, pricing, and answer general tax compliance questions based on the platform's capabilities (standard 20% tax, 1% small business tax, pension contributions). Be concise, professional, and friendly. ${langInstruction}`,
        temperature: 0.7,
      }
    });

    return Response.json({ text: response.text });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Failed to generate AI response." }, { status: 500 });
  }
}

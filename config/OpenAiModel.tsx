import OpenAI from "openai";

if (!process.env.OPEN_ROUTER_API_KEY) {
  throw new Error("❌ OPEN_ROUTER_API_KEY is not set in environment variables");
}

export const openai = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer":
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "AI Medical Voice App",
  },
});

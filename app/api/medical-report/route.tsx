import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `
You are an AI Medical Voice Agent that just finished a voice conversation with a user.

Generate a structured medical report.

Return ONLY valid JSON in this exact format:

{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1"],
  "duration": "string",
  "severity": "mild | moderate | severe",
  "medicationsMentioned": ["med1"],
  "recommendations": ["rec1"]
}
`;

export async function POST(req: NextRequest) {
  try {
    const { sessionId, sessionDetail, messages } = await req.json();

    const userInput = `
Doctor Info:
${JSON.stringify(sessionDetail)}

Conversation:
${JSON.stringify(messages)}
`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      temperature: 0,
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: userInput },
      ],
    });

    const raw = completion.choices[0].message.content || "";

    const cleaned = raw
      .replace("```json", "")
      .replace("```", "")
      .trim();

    const json = JSON.parse(cleaned);

    await db
      .update(SessionChatTable)
      .set({
        report: json,
        conversation: messages,
      })
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(json);
  } catch (error) {
    console.error("Report Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}

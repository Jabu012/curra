import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json();

    if (!notes) {
      return NextResponse.json(
        { error: "Notes are required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      temperature: 0, // important for consistent JSON
      messages: [
        {
          role: "system",
          content: `
You are a medical routing AI.

You MUST:
- Return ONLY a JSON array of doctor IDs.
- Do NOT explain.
- Do NOT wrap in markdown.
- Do NOT return text.
- Example valid response: [1,2]

Available Doctors:
${AIDoctorAgents.map(
  (doc) => `ID: ${doc.id} - ${doc.specialist}: ${doc.description}`
).join("\n")}
`,
        },
        {
          role: "user",
          content: `User Symptoms:\n${notes}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    // Clean possible markdown wrapping
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedIds: number[] = [];

    try {
      parsedIds = JSON.parse(cleaned);
    } catch {
      console.error("Invalid JSON from model:", raw);
      return NextResponse.json(
        { error: "AI returned invalid format" },
        { status: 500 }
      );
    }

    if (!Array.isArray(parsedIds)) {
      return NextResponse.json(
        { error: "AI did not return an array" },
        { status: 500 }
      );
    }

    const filteredDoctors = AIDoctorAgents.filter((doc) =>
      parsedIds.includes(doc.id)
    );

    return NextResponse.json(filteredDoctors);
  } catch (error) {
    console.error("Doctor matching error:", error);
    return NextResponse.json(
      { error: "Doctor matching failed" },
      { status: 500 }
    );
  }
}

import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: JSON.stringify(AIDoctorAgents) },
        { 
          role: "user", 
          content: `
User Notes/Symptoms: ${notes}

From the provided doctor list above, return ONLY an array of matching doctor IDs.
Do NOT create new objects.
Return JSON array of numbers only.
Example: [1,2]
`
        }
      ],
    });

    const rawResp = completion.choices[0].message || '';
    //@ts-ignore
    const Resp = rawResp.content.trim().replace('```json','').replace('```','');
    const JSONResp = JSON.parse(Resp);

    // Filter original doctor list using returned IDs
    const filteredDoctors = AIDoctorAgents.filter((doc) =>
      JSONResp.includes(doc.id)
    );

    return NextResponse.json(filteredDoctors);

  } catch (e) {
    return NextResponse.json(e);
  }
}

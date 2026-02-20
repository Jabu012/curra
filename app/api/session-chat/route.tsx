import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sessionId = uuidv4();

    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId,
        createdBy: user.primaryEmailAddress.emailAddress, // ✅ now guaranteed string
        notes,
        selectedDoctor,
        createdOn: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const email = user.primaryEmailAddress.emailAddress; // ✅ strongly typed string

  if (sessionId === "all") {
    const result = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.createdBy, email)) // ✅ no undefined
      .orderBy(desc(SessionChatTable.id));

    return NextResponse.json(result);
  }

  const result = await db
    .select()
    .from(SessionChatTable)
    .where(eq(SessionChatTable.sessionId, sessionId!));

  return NextResponse.json(result[0]);
}

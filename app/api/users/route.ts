import { db } from "@/config/db"
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // verify the requester is authenticated via Clerk
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) {
    return NextResponse.json({ error: 'Missing email address' }, { status: 400 });
  }

  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({
          name: user.fullName ?? '',
          email,
          credits: 10,
        })
        .returning();

      // result will be an array of inserted rows
      return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
  } catch (e) {
    console.error('users POST error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { RequestBody } from "@/app/utils/types";
import { user } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id);
  console.log("PUT /api/users/[id] userId:", userId);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const body: RequestBody = await req.json();

    await db
      .update(user)
      .set({
        isActive: body.is_active ? 1 : 0,
      })
      .where(eq(user.userId, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/users/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

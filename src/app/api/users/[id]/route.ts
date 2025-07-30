import { db } from "@/db/client";
import { user, usersVendors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  email: string;
  display_name?: string;
  is_active: boolean;
  vendor_ids: number[];
};


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
        email: body.email,
        displayName: body.display_name ?? "",
        isActive: body.is_active ? 1 : 0,
      })
      .where(eq(user.userId, userId));

    // Sync vendor_ids
    if (Array.isArray(body.vendor_ids)) {
      // 1. Delete existing vendors
      await db.delete(usersVendors).where(eq(usersVendors.userId, userId));

      // 2. Insert new ones
      if (body.vendor_ids.length > 0) {
        const userVendorsToInsert = body.vendor_ids.map((vendorId) => ({
          userId,
          vendorId,
          isEnabled: 1,
          createdAt: new Date().toISOString(),
        }));

        await db.insert(usersVendors).values(userVendorsToInsert);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id);
  console.log("DELETE /api/users/[id] userId:", userId);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    // Delete related vendors first (if needed)
    await db.delete(usersVendors).where(eq(usersVendors.userId, userId));
    // Delete the user
    await db.delete(user).where(eq(user.userId, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

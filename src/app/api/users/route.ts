import { db } from "@/db/client";
import { user, vendor, usersVendors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { UserWithVendors } from "@/app/utils/types";


type RawRow = {
  user_id: number;
  display_name: string | null;
  email: string;
  is_active: number | null;
  created_at: string | null;
  vendor_id: number | null;
  vendor_name: string | null;
};

function formatUsersWithVendors(rows: RawRow[]): UserWithVendors[] {
  const userMap = new Map<number, UserWithVendors>();

  for (const row of rows) {
    if (!userMap.has(row.user_id)) {
      userMap.set(row.user_id, {
        user_id: row.user_id,
        display_name: row.display_name ?? "",
        email: row.email,
        is_active: Boolean(row.is_active),
        created_at: row.created_at ?? "",
        vendors: [],
      });
    }

    if (row.vendor_id && row.vendor_name) {
      userMap.get(row.user_id)!.vendors.push({
        vendor_id: row.vendor_id,
        vendor_name: row.vendor_name,
      });
    }
  }

  return Array.from(userMap.values());
}

export async function GET() {
  try {
    const rows: RawRow[] = await db
      .select({
        user_id: user.userId,
        display_name: user.displayName,
        email: user.email,
        is_active: user.isActive,
        created_at: user.createdAt,
        vendor_id: vendor.vendorId,
        vendor_name: vendor.name,
      })
      .from(user)
      .leftJoin(usersVendors, eq(user.userId, usersVendors.userId))
      .leftJoin(vendor, eq(usersVendors.vendorId, vendor.vendorId));

    const formattedUsers = formatUsersWithVendors(rows);
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users with vendors:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

type RequestBody = {
  email: string;
  display_name?: string;
  is_active: boolean;
  vendor_ids: number[];
};

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Insert user and get inserted ID
    const insertResult = await db
      .insert(user)
      .values({
        email: body.email,
        displayName: body.display_name ?? "",
        isActive: body.is_active ? 1 : 0,
        createdAt: new Date().toISOString(),
      })
      .returning({ id: user.userId });

    const insertedUserId = insertResult[0].id;

    // Insert user-vendor relations if any
    if (body.vendor_ids && body.vendor_ids.length > 0) {
      const userVendorsToInsert = body.vendor_ids.map((vendorId) => ({
        userId: insertedUserId,
        vendorId,
        isEnabled: 1,
        createdAt: new Date().toISOString(),
      }));

      await db.insert(usersVendors).values(userVendorsToInsert);
    }

    return NextResponse.json({ message: "User created", userId: insertedUserId });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

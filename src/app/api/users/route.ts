import { db } from "@/db/client";
import { user, vendor, usersVendors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
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

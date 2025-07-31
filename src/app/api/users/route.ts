import { db } from "@/db/client";
import { UserWithVendors } from "@/app/utils/types";
import { user, vendor, usersVendors } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .select({
        userId: user.userId,
        displayName: user.displayName,
        email: user.email,
        isActive: user.isActive,
        createdAt: user.createdAt,
        vendorId: vendor.vendorId,
        vendorName: vendor.name,
      })
      .from(user)
      .leftJoin(usersVendors, eq(user.userId, usersVendors.userId))
      .leftJoin(vendor, eq(usersVendors.vendorId, vendor.vendorId));

    const usersMap = new Map<number, UserWithVendors>();

    for (const row of rows) {
      if (!usersMap.has(row.userId)) {
        usersMap.set(row.userId, {
          user_id: row.userId,
          display_name: row.displayName ?? "",
          email: row.email,
          is_active: !!row.isActive,
          created_at: row.createdAt ?? "",
          vendors: [],
        });
      }

      if (row.vendorId && row.vendorName) {
        usersMap?.get(row.userId)!.vendors.push({
          vendor_id: row.vendorId,
          vendor_name: row.vendorName,
        });
      }
    }

    return NextResponse.json(Array.from(usersMap.values()));
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

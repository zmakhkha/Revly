import { db } from "@/db/client";
import { vendor, chain } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db
    .select({
      vendor_id: vendor.vendorId,
      vendor_name: vendor.name,
      chain_id: chain.chainId,
      chain_name: chain.name,
      latitude: vendor.latitude,
      longitude: vendor.longitude,
      created_at: vendor.createdAt,
    })
    .from(vendor)
    .innerJoin(chain, eq(vendor.chainId, chain.chainId));
    console.log("Fetched vendors:", data);

  return NextResponse.json(data);
}

import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { db } from "./client";
import { user, vendor, chain } from "./schema";

function parseCSVToObjects(filePath: string): Record<string, string>[] {
  const content = fs.readFileSync(filePath, "utf-8");
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
  });
}

function getFormattedDate(): string {
  const now = new Date();
  return `${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}-${now.getFullYear()}`;
}

async function seedDatabase() {
  const formattedNow = getFormattedDate();

  const rawUsers = parseCSVToObjects(path.join(__dirname, "data", "users.csv"));
  const usersToInsert = rawUsers.map((u) => ({
    userId: +u.user_id,
    displayName: u.display_name,
    email: u.email,
    is_active: u.is_active === "TRUE" ? 1 : 0,
    createdAt: formattedNow,
  }));

  const rawChains = parseCSVToObjects(
    path.join(__dirname, "data", "chains.csv")
  );
  const chainsToInsert = rawChains.map((c) => ({
    chainId: +c.chain_id,
    name: c.chain_name,
    createdAt: formattedNow,
  }));

  const rawVendors = parseCSVToObjects(
    path.join(__dirname, "data", "vendors.csv")
  );
  const vendorsToInsert = rawVendors.map((v) => ({
    vendorId: +v.vendor_id,
    name: v.vendor_name,
    chainId: +v.chain_id,
    longitude: parseFloat(v.longitude),
    latitude: parseFloat(v.latitude),
    createdAt: formattedNow,
  }));

  await db.insert(user).values(usersToInsert);
  await db.insert(chain).values(chainsToInsert);
  await db.insert(vendor).values(vendorsToInsert);

  console.log("✅ Seeded successfully");
}

seedDatabase();

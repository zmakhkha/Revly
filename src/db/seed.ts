import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { db } from './client';
import { user, vendor, chain } from './schema';

function readCSV(filePath: string) {
  const content = fs.readFileSync(filePath);
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
  });
}

async function seed() {
  const now = new Date().toISOString();

  const userData = readCSV(path.join(__dirname, 'data', 'users.csv')).map((u: any) => ({
    user_id: +u.user_id,
    display_name: u.display_name,
    email: u.email,
    is_active: u.is_active === 'TRUE' ? 1 : 0,
    created_at: now,
  }));

  const vendorsData = readCSV(path.join(__dirname, 'data', 'vendors.csv')).map((v: any) => ({
    vendorId: +v.vendor_id,
    name: v.vendor_name,
    chainId: +v.chain_id,
    longitude: parseFloat(v.longitude),
    latitude: parseFloat(v.latitude),
    created_at: now,
  }));

  const chainData = readCSV(path.join(__dirname, 'data', 'chains.csv')).map((c: any) => ({
    chainId: +c.chain_id,
    name: c.chain_name,
    created_at: now,
  }));

  await db.insert(user).values(userData);
  await db.insert(chain).values(chainData);
  await db.insert(vendor).values(vendorsData);

  console.log('✅ Seeded successfully');
}

seed();

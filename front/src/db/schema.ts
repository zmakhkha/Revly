import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// chain table
export const chain = sqliteTable("chain", {
  chainId: integer("chain_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: text("created_at"),
});

// vendor table
export const vendor = sqliteTable("vendor", {
  vendorId: integer("vendor_id").primaryKey({ autoIncrement: true }),
  chainId: integer("chain_id").notNull().references(() => chain.chainId),
  name: text("name").notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  createdAt: text("created_at"),
});

// user table
export const user = sqliteTable("user", {
  userId: integer("user_id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  isActive: integer("is_active").default(1),
  createdAt: text("created_at"),
});

// users_vendors table
export const usersVendors = sqliteTable("users_vendors", {
  userId: integer("user_id").notNull().references(() => user.userId),
  vendorId: integer("vendor_id").notNull().references(() => vendor.vendorId),
  displayName: text("display_name"),
  isEnabled: integer("is_enabled").default(1),
  createdAt: text("created_at"),
});

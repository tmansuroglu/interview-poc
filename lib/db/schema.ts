import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 128 }).primaryKey(), // Firebase UID
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  lastLoginAt: timestamp("last_login_at", {
    withTimezone: true,
  }),
});

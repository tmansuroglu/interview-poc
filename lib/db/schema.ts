import { pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

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

export const records = pgTable("records", {
  id: varchar("id", { length: 128 }).primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  vaccinated: boolean("vaccinated").notNull(),

  recordedByUserId: varchar("recorded_by_user_id", { length: 128 })
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

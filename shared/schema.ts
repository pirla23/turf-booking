import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  playerName: text("player_name").notNull(),
  email: text("email"),
  mobile: text("mobile").notNull(),
  sport: text("sport").notNull(),
  date: text("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time"),
  duration: integer("duration"),
  session: text("session"), // AM, PM, or Custom
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull()
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

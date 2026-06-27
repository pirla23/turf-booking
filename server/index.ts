import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.json());
  app.use(express.static(staticPath));

  // API Routes
  app.get("/api/bookings", async (_req, res) => {
    try {
      const { db } = await import("./db.js");
      const { bookings } = await import("../shared/schema.js");
      const allBookings = await db.select().from(bookings);
      res.json(allBookings);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const { db } = await import("./db.js");
      const { bookings } = await import("../shared/schema.js");
      const newBooking = { ...req.body, createdAt: new Date().toISOString() };
      const result = await db.insert(bookings).values(newBooking).returning();
      res.json(result[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const { db } = await import("./db.js");
      const { bookings } = await import("../shared/schema.js");
      const { eq } = await import("drizzle-orm");
      const { id } = req.params;
      const { status } = req.body;
      const result = await db.update(bookings).set({ status }).where(eq(bookings.id, Number(id))).returning();
      res.json(result[0]);
    } catch (e) {
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const { db } = await import("./db.js");
      const { bookings } = await import("../shared/schema.js");
      const { eq } = await import("drizzle-orm");
      const { id } = req.params;
      await db.delete(bookings).where(eq(bookings.id, Number(id)));
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3001;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

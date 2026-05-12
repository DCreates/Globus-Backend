import sequelize from "../config/db.js";
import app from "../app.js";
import { seedDatabase } from "../utils/seedDatabase.js";

let connected = false;
let seeded = false;

const ensureDb = async () => {
  if (!connected) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      connected = true;
    } catch (err) {
      // log and continue; Vercel will show the error in function logs
      console.error("DB connect failed:", err);
    }
  }

  if (connected && !seeded) {
    try {
      await seedDatabase();
      seeded = true;
    } catch (err) {
      console.error("DB seed failed:", err);
    }
  }
};

export default async function handler(req, res) {
  try {
    await ensureDb();

    // Delegate to Express app
    return app(req, res);
  } catch (err) {
    // Log full error for Vercel function logs and return a safe 500
    console.error("Serverless handler error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

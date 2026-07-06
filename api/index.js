import app from "../app.js";
import connectMongo from "../config/mongo.js";

const allowedOrigins = new Set([
  "https://www.globusgroups.lk",
  "https://globusgroups.lk",
  "http://localhost:3000",
  "http://localhost:5173",
]);

const applyCorsHeaders = (req, res) => {
  const origin = req.headers.origin;

  if (!origin || allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
};

const ensureDb = async () => {
  try {
    await connectMongo();
  } catch (err) {
    // log and continue; Vercel will show the error in function logs
    console.error("DB connect failed:", err);
  }
};

export default async function handler(req, res) {
  try {
    applyCorsHeaders(req, res);

    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      return res.end();
    }

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

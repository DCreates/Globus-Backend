import sequelize from "../config/db.js";
import app from "../app.js";

let connected = false;

const setCorsHeaders = (res, req) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean);
  const isAllowedOrigin = !origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");

  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", "true");
};

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
};

export default async function handler(req, res) {
  try {
    setCorsHeaders(res, req);

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
    setCorsHeaders(res, req);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

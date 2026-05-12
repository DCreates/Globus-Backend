import connectDB from "../config/db.js";
import app from "../app.js";

let connected = false;

const ensureDb = async () => {
  if (!connected) {
    try {
      await connectDB();
      connected = true;
    } catch (err) {
      // log and continue; Vercel will show the error in function logs
      console.error("DB connect failed:", err);
    }
  }
};

export default async function handler(req, res) {
  await ensureDb();
  return app(req, res);
}

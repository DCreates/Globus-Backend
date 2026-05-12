import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Choose a writable SQLite storage path. On Vercel serverless functions the
// recommended writable location is /tmp. Allow overriding via SQLITE_STORAGE.
const defaultStorage = process.env.SQLITE_STORAGE
  || (process.env.VERCEL ? path.join("/tmp", "database.sqlite") : path.join(__dirname, "../database.sqlite"));

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: defaultStorage,
  logging: false, // Set to console.log to see SQL queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("SQLite Database Connected");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    // Do not exit the process in serverless environments (Vercel) —
    // throw the error so callers can decide how to handle it.
    throw error;
  }
};

export { sequelize };
export default connectDB;
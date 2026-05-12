import dotenv from "dotenv";
import connectMongo from "../config/mongo.js";
import { seedDatabase } from "../utils/seedDatabase.js";

dotenv.config();

const run = async () => {
  try {
    await connectMongo();
    await seedDatabase({ force: true });

    console.log("Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeder failed:", err.message || err);
    process.exit(1);
  }
};

run();

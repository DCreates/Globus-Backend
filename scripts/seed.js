import fs from "fs/promises";
import path from "path";
import sequelize from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Service from "../models/CommunityServices.js";
import Testimonial from "../models/Testimonials.js";
import Branch from "../models/Branches.js";
import bcrypt from "bcryptjs";

const dataDir = path.join(process.cwd(), "data");

const modelMap = {
  users: User,
  user: User,
  products: Product,
  product: Product,
  services: Service,
  service: Service,
  testimonials: Testimonial,
  testimonial: Testimonial,
  branches: Branch,
  branch: Branch,
};

const normalize = (name) => name.toLowerCase().replace(/\.json$/, "");

const seedFile = async (file) => {
  const filePath = path.join(dataDir, file);
  const raw = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(raw);

  const key = normalize(file);
  const Model = modelMap[key];
  if (!Model) {
    console.warn(`No model mapped for ${file}, skipping.`);
    return;
  }

  let rows = Array.isArray(data) ? data : [data];

  // If seeding users, hash passwords when present
  if (Model === User) {
    rows = await Promise.all(
      rows.map(async (r) => {
        if (r.password) {
          const hash = await bcrypt.hash(r.password, 10);
          return { ...r, password: hash };
        }
        return r;
      })
    );
  }

  // Use upsert-like behavior: create or ignore duplicates by unique fields
  try {
    await Model.bulkCreate(rows, { validate: true, ignoreDuplicates: true });
    console.log(`Seeded ${rows.length} record(s) into ${Model.name} from ${file}`);
  } catch (err) {
    console.error(`Failed to seed ${file}:`, err.message || err);
  }
};

const run = async () => {
  try {
    await sequelize.authenticate();

    // ensure data directory exists
    try {
      const stat = await fs.stat(dataDir);
      if (!stat.isDirectory()) throw new Error("not a directory");
    } catch (err) {
      console.error("Data folder not found. Create a 'data' folder with JSON files (users.json, products.json, etc.).");
      process.exit(1);
    }

    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    if (jsonFiles.length === 0) {
      console.error("No JSON files found in data/. Add files like users.json, products.json, branches.json.");
      process.exit(1);
    }

    for (const file of jsonFiles) {
      await seedFile(file);
    }

    console.log("Seeding complete.");
    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error("Seeder failed:", err.message || err);
    process.exit(1);
  }
};

run();

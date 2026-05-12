import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Service from "../models/CommunityServices.js";
import Testimonial from "../models/Testimonials.js";
import Branch from "../models/Branches.js";

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

const seedFile = async (file, { force = false } = {}) => {
  const filePath = path.join(dataDir, file);
  const raw = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(raw);

  const key = normalize(file);
  const Model = modelMap[key];
  if (!Model) {
    console.warn(`No model mapped for ${file}, skipping.`);
    return;
  }

  const existingCount = await Model.countDocuments();
  if (!force && existingCount > 0) {
    return;
  }

  let rows = Array.isArray(data) ? data : [data];

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

  if (force) {
    await Model.deleteMany({});
  }

  await Model.insertMany(rows, { ordered: false });
  console.log(`Seeded ${rows.length} record(s) into ${Model.modelName} from ${file}`);
};

export const seedDatabase = async ({ force = false } = {}) => {
  const stat = await fs.stat(dataDir);
  if (!stat.isDirectory()) {
    throw new Error("Data folder is not a directory");
  }

  const files = await fs.readdir(dataDir);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  if (jsonFiles.length === 0) {
    throw new Error("No JSON files found in data/");
  }

  for (const file of jsonFiles) {
    await seedFile(file, { force });
  }
};

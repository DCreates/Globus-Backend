import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import testimonialRoutes from "./routes/testimonialRoute.js";
import serviceRoutes from "./routes/serviceRoute.js";
import branchRoutes from "./routes/branchRoute.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
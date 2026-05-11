import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// READ all
router.get("/", getProducts);

// READ single
router.get("/:id", getProductById);

// CREATE
router.post("/", protect, adminOnly, createProduct);

// UPDATE
router.put("/:id", protect, adminOnly, updateProduct);

// DELETE
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
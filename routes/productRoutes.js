import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// READ all
router.get("/", getProducts);

// READ single
router.get("/:id", getProductById);

// CREATE
router.post("/", protect, createProduct);

// UPDATE
router.put("/:id", protect, updateProduct);

// DELETE
router.delete("/:id", protect, deleteProduct);

export default router;
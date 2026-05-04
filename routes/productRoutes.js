import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// READ
router.get("/", getProducts);

// CREATE
router.post("/", protect, createProduct);

// UPDATE
router.put("/:id", protect, updateProduct);

// DELETE
router.delete("/:id", protect, deleteProduct);

export default router;
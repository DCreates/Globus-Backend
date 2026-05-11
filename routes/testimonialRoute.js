import express from "express";
import {
  getTestimonials,
  createTestimonial,
} from "../controllers/testimonialController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", protect, adminOnly, createTestimonial);

export default router;
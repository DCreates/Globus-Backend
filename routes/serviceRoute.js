import express from "express";
import {
  getServices,
  createService,
} from "../controllers/serviceController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", protect, adminOnly, createService);

export default router;
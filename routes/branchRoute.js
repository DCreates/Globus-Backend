import express from "express";
import {
  getBranches,
  createBranch,
  updateBranch,
  
} from "../controllers/branchController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBranches);
router.post("/", protect, adminOnly, createBranch);
router.put("/:id", protect, adminOnly, updateBranch);


export default router;
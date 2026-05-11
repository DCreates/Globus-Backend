import express from "express";
import {
  getBranches,
  createBranch,
  
} from "../controllers/branchController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBranches);
router.post("/", protect, adminOnly, createBranch);


export default router;
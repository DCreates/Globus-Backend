// routes/uploadRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';

const router = express.Router();

// POST /api/upload  → upload single image
router.post('/', upload.single('image'), uploadImage);

// DELETE /api/upload/:filename  → delete image
router.delete('/:filename', deleteImage);

export default router;
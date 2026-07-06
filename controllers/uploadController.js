// controllers/uploadController.js
import cloudinary from '../utils/cloudinary.js';

export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok') {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found on Cloudinary' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = req.file.path;

    res.status(201).json({
      message: 'Image uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      public_id: req.file.filename,
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message });
  }
};
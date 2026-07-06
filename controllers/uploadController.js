// controllers/uploadController.js
import fs from 'fs';
import path from 'path';

// Delete image from uploads folder
export const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join('uploads/products', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;

    res.status(201).json({
      message: 'Image uploaded successfully',
      url: fileUrl,
      filename: req.file.filename
    });

  } catch (err) {
    console.error('Upload error:', err); // See exact error
    res.status(500).json({ message: err.message });
  }
};
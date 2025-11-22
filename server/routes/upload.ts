import { RequestHandler } from 'express';

export const handleImageUpload: RequestHandler = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const handlePDFUpload: RequestHandler = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const handleVideoUpload: RequestHandler = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

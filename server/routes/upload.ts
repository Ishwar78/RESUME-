import { Request, Response } from "express";

export const handleImageUpload = (req: Request, res: Response) => {
  try {
    const file = (req as any).file as any;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `/uploads/${file.filename}`;
    res.json({
      url: fileUrl,
      filename: file.filename,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

export const handlePDFUpload = (req: Request, res: Response) => {
  try {
    const file = (req as any).file as any;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `/uploads/${file.filename}`;
    res.json({
      url: fileUrl,
      filename: file.filename,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

export const handleVideoUpload = (req: Request, res: Response) => {
  try {
    const file = (req as any).file as any;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `/uploads/${file.filename}`;
    res.json({
      url: fileUrl,
      filename: file.filename,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

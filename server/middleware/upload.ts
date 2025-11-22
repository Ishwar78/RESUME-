import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter for different file types
const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const pdfFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const videoFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimes = ['video/mp4', 'video/webm', 'video/quicktime'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'));
  }
};

export const uploadImage = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export const uploadPDF = multer({ storage, fileFilter: pdfFilter, limits: { fileSize: 20 * 1024 * 1024 } });
export const uploadVideo = multer({ storage, fileFilter: videoFilter, limits: { fileSize: 100 * 1024 * 1024 } });
export const uploadFile = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Express.Request {
  userId?: string;
}

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as AuthRequest).userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
};

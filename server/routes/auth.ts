import { RequestHandler } from "express";
import { AdminUser } from "../models/AdminUser";
import { generateToken } from "../middleware/auth";

interface LoginRequest {
  email: string;
  password: string;
}

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await adminUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(adminUser._id.toString());
    res.json({
      token,
      user: {
        id: adminUser._id,
        email: adminUser.email,
        name: adminUser.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleLogout: RequestHandler = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};

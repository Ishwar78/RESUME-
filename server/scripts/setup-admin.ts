import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";

async function setupAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({
      email: "sharmaishwar@gmail.com",
    });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user with provided credentials
    const adminUser = new AdminUser({
      email: "sharmaishwar@gmail.com",
      passwordHash: "ishwar@2002", // Will be hashed by pre-save middleware
      name: "Ishwar Sharma",
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully");
    console.log("📧 Email: sharmaishwar@gmail.com");
    console.log("🔐 Password: ishwar@2002");
    console.log("✨ You can now log in to the admin panel!");

    process.exit(0);
  } catch (error) {
    console.error("Setup error:", error);
    process.exit(1);
  }
}

setupAdmin();

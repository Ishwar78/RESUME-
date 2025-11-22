import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../models/AdminUser';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

async function setupAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin user
    const adminUser = new AdminUser({
      email: 'admin@example.com',
      passwordHash: 'admin123', // Will be hashed by pre-save middleware
      name: 'Admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('⚠️  IMPORTANT: Change this password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
}

setupAdmin();

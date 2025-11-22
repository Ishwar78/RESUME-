import mongoose, { NextFunction } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IAdminUser {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

interface IAdminUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type AdminUserModel = mongoose.Model<IAdminUser, {}, IAdminUserMethods>;

const adminUserSchema = new mongoose.Schema<IAdminUser, AdminUserModel, IAdminUserMethods>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
adminUserSchema.pre<IAdminUser>('save', async function (this, next: NextFunction) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
});

// Method to compare passwords
adminUserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

export const AdminUser = mongoose.model<IAdminUser>('AdminUser', adminUserSchema);
export type { IAdminUser };

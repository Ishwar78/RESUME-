import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://sharmaishwar970:ISHWAR2002@cluster0.b73q6ph.mongodb.net/Portfolio";

const adminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

adminUserSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) {
    return;
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    this.passwordHash = await bcryptjs.hash(this.passwordHash, salt);
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
});

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

async function setupAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Delete existing admin if needed
    await AdminUser.deleteOne({ email: "sharmaishwar@gmail.com" });
    console.log("🗑️  Cleared existing admin user");

    // Create new admin user
    const adminUser = new AdminUser({
      email: "sharmaishwar@gmail.com",
      passwordHash: "ishwar@2002",
      name: "Ishwar Sharma",
    });

    await adminUser.save();
    console.log("\n✅ Admin user created successfully!\n");
    console.log("📧 Email: sharmaishwar@gmail.com");
    console.log("🔐 Password: ishwar@2002");
    console.log("\n✨ You can now log in to the admin panel!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup error:", error);
    process.exit(1);
  }
}

setupAdmin();

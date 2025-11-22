import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { handleSendEmail } from "./routes/email";
import { connectDB } from "./config/db";
import { authenticateToken } from "./middleware/auth";
import { uploadImage, uploadPDF, uploadVideo } from "./middleware/upload";
import { handleLogin, handleLogout } from "./routes/auth";
import {
  handleImageUpload,
  handlePDFUpload,
  handleVideoUpload,
} from "./routes/upload";
import {
  getAbout,
  getSkills,
  getProjects,
  getProjectBySlug,
  getExperience,
} from "./routes/public";
import { getAboutForAdmin, updateAbout } from "./routes/admin-about";
import {
  getSkillCategories,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  addSkillToCategory,
  updateSkillInCategory,
  deleteSkillFromCategory,
} from "./routes/admin-skills";
import {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
} from "./routes/admin-projects";
import {
  getAllExperience,
  createExperience,
  getExperience as getExperienceById,
  updateExperience,
  deleteExperience,
} from "./routes/admin-experience";

export function createServer() {
  const app = express();

  // Connect to MongoDB
  connectDB().catch(console.error);

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from public directory
  app.use(express.static(path.join(process.cwd(), "public")));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/send-email", handleSendEmail);

  // ========== PUBLIC API ROUTES ==========
  app.get("/api/about", getAbout);
  app.get("/api/skills", getSkills);
  app.get("/api/projects", getProjects);
  app.get("/api/projects/:slug", getProjectBySlug);
  app.get("/api/experience", getExperience);

  // ========== AUTHENTICATION ROUTES ==========
  app.post("/api/admin/auth/login", handleLogin);
  app.post("/api/admin/auth/logout", handleLogout);

  // ========== PROTECTED ADMIN ROUTES ==========
  // About Management
  app.get("/api/admin/about", authenticateToken, getAboutForAdmin);
  app.put("/api/admin/about", authenticateToken, updateAbout);

  // Skills Management
  app.get("/api/admin/skills", authenticateToken, getSkillCategories);
  app.post(
    "/api/admin/skills-category",
    authenticateToken,
    createSkillCategory,
  );
  app.put(
    "/api/admin/skills-category/:id",
    authenticateToken,
    updateSkillCategory,
  );
  app.delete(
    "/api/admin/skills-category/:id",
    authenticateToken,
    deleteSkillCategory,
  );
  app.post(
    "/api/admin/skills-category/:id/skills",
    authenticateToken,
    addSkillToCategory,
  );
  app.put(
    "/api/admin/skills-category/:id/skills/:skillId",
    authenticateToken,
    updateSkillInCategory,
  );
  app.delete(
    "/api/admin/skills-category/:id/skills/:skillId",
    authenticateToken,
    deleteSkillFromCategory,
  );

  // Projects Management
  app.get("/api/admin/projects", authenticateToken, getAllProjects);
  app.post("/api/admin/projects", authenticateToken, createProject);
  app.get("/api/admin/projects/:id", authenticateToken, getProject);
  app.put("/api/admin/projects/:id", authenticateToken, updateProject);
  app.delete("/api/admin/projects/:id", authenticateToken, deleteProject);

  // Experience Management
  app.get("/api/admin/experience", authenticateToken, getAllExperience);
  app.post("/api/admin/experience", authenticateToken, createExperience);
  app.get("/api/admin/experience/:id", authenticateToken, getExperienceById);
  app.put("/api/admin/experience/:id", authenticateToken, updateExperience);
  app.delete("/api/admin/experience/:id", authenticateToken, deleteExperience);

  // ========== FILE UPLOAD ROUTES ==========
  app.post(
    "/api/admin/upload/image",
    authenticateToken,
    uploadImage.single("file"),
    handleImageUpload,
  );
  app.post(
    "/api/admin/upload/pdf",
    authenticateToken,
    uploadPDF.single("file"),
    handlePDFUpload,
  );
  app.post(
    "/api/admin/upload/video",
    authenticateToken,
    uploadVideo.single("file"),
    handleVideoUpload,
  );

  return app;
}

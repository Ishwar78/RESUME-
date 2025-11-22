import { RequestHandler } from "express";
import { AboutSection } from "../models/AboutSection";
import { SkillCategory } from "../models/SkillCategory";
import { Project } from "../models/Project";
import { ExperienceEntry } from "../models/ExperienceEntry";

export const getAbout: RequestHandler = async (req, res) => {
  try {
    const about = await AboutSection.findOne();
    if (!about) {
      return res.status(404).json({ error: "About section not found" });
    }
    res.json(about);
  } catch (error) {
    console.error("Get about error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSkills: RequestHandler = async (req, res) => {
  try {
    const skills = await SkillCategory.find().sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    console.error("Get skills error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProjects: RequestHandler = async (req, res) => {
  try {
    const { featured } = req.query;
    let query = {};

    if (featured === "true") {
      query = { isFeatured: true };
    }

    const projects = await Project.find(query).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProjectBySlug: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getExperience: RequestHandler = async (req, res) => {
  try {
    const experience = await ExperienceEntry.find().sort({
      order: 1,
      startDate: -1,
    });
    res.json(experience);
  } catch (error) {
    console.error("Get experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

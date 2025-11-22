import { RequestHandler } from "express";
import { ExperienceEntry, IExperienceEntry } from "../models/ExperienceEntry";

export const getAllExperience: RequestHandler = async (req, res) => {
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

export const createExperience: RequestHandler = async (req, res) => {
  try {
    const experienceData = req.body as Partial<IExperienceEntry>;

    if (!experienceData.companyName || !experienceData.roleTitle) {
      return res
        .status(400)
        .json({ error: "Company name and role title are required" });
    }

    const experience = new ExperienceEntry(experienceData);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    console.error("Create experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getExperience: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await ExperienceEntry.findById(id);

    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    res.json(experience);
  } catch (error) {
    console.error("Get experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateExperience: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body as Partial<IExperienceEntry>;

    const experience = await ExperienceEntry.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    res.json(experience);
  } catch (error) {
    console.error("Update experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteExperience: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await ExperienceEntry.findByIdAndDelete(id);
    res.json({ message: "Experience deleted" });
  } catch (error) {
    console.error("Delete experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

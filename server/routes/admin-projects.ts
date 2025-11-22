import { RequestHandler } from 'express';
import { Project, IProject } from '../models/Project';

export const getAllProjects: RequestHandler = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProject: RequestHandler = async (req, res) => {
  try {
    const projectData = req.body as Partial<IProject>;

    if (!projectData.title || !projectData.slug) {
      return res.status(400).json({ error: 'Title and slug are required' });
    }

    // Check if slug already exists
    const existingProject = await Project.findOne({ slug: projectData.slug });
    if (existingProject) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body as Partial<IProject>;

    const project = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

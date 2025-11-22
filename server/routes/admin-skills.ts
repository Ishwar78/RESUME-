import { RequestHandler } from 'express';
import { SkillCategory, ISkillCategory, ISkill } from '../models/SkillCategory';

export const getSkillCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await SkillCategory.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Get skill categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSkillCategory: RequestHandler = async (req, res) => {
  try {
    const { name, order } = req.body as Partial<ISkillCategory>;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const category = new SkillCategory({ name, order: order || 0, skills: [] });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Create skill category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSkillCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body as Partial<ISkillCategory>;

    const category = await SkillCategory.findByIdAndUpdate(id, data, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Update skill category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSkillCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await SkillCategory.findByIdAndDelete(id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Delete skill category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addSkillToCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = req.body as ISkill;

    const category = await SkillCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.skills.push(skill);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSkillInCategory: RequestHandler = async (req, res) => {
  try {
    const { id, skillId } = req.params;
    const skillUpdate = req.body as Partial<ISkill>;

    const category = await SkillCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const skill = category.skills.id(skillId);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    Object.assign(skill, skillUpdate);
    await category.save();
    res.json(category);
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSkillFromCategory: RequestHandler = async (req, res) => {
  try {
    const { id, skillId } = req.params;

    const category = await SkillCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.skills.id(skillId)?.deleteOne();
    await category.save();
    res.json(category);
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

import { RequestHandler } from 'express';
import { AboutSection, IAboutSection } from '../models/AboutSection';

export const updateAbout: RequestHandler = async (req, res) => {
  try {
    const data = req.body as Partial<IAboutSection>;

    let about = await AboutSection.findOne();

    if (!about) {
      about = new AboutSection(data);
    } else {
      Object.assign(about, data);
    }

    await about.save();
    res.json(about);
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAboutForAdmin: RequestHandler = async (req, res) => {
  try {
    const about = await AboutSection.findOne();
    if (!about) {
      return res.json({});
    }
    res.json(about);
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

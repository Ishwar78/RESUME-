/**
 * Shared types between client and server
 */

export interface ISocialLink {
  type: 'github' | 'linkedin' | 'twitter' | 'email' | 'website';
  label: string;
  url: string;
}

export interface IAboutSection {
  _id?: string;
  name: string;
  headline: string;
  shortSummary: string;
  longDescription: string;
  location: string;
  yearsOfExperience: number;
  profilePhotoUrl: string;
  resumeFileUrl: string;
  socialLinks: ISocialLink[];
  updatedAt?: Date;
}

export interface ISkill {
  _id?: string;
  label: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string;
  showInHighlights: boolean;
}

export interface ISkillCategory {
  _id?: string;
  name: string;
  order: number;
  skills: ISkill[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProjectDetail {
  markdownContent: string;
  sections?: {
    title: string;
    content: string;
  }[];
  galleryImages: {
    url: string;
    caption?: string;
  }[];
  demoVideoUrl?: string;
}

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  techStack: string[];
  role: string;
  projectType: 'personal' | 'freelance' | 'internship' | 'client work';
  startDate: Date;
  endDate?: Date;
  isOngoing: boolean;
  thumbnailImageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  order: number;
  detail?: IProjectDetail;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExperienceEntry {
  _id?: string;
  companyName: string;
  roleTitle: string;
  employmentType: 'full-time' | 'part-time' | 'internship' | 'freelance';
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  descriptionBullets: string[];
  techUsed: string[];
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

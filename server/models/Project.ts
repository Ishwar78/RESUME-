import mongoose from "mongoose";

interface IProjectDetail {
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

interface IProject {
  title: string;
  slug: string;
  shortDescription: string;
  techStack: string[];
  role: string;
  projectType: "personal" | "freelance" | "internship" | "client work";
  startDate: Date;
  endDate?: Date;
  isOngoing: boolean;
  thumbnailImageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  order: number;
  detail?: IProjectDetail;
  createdAt: Date;
  updatedAt: Date;
}

const projectDetailSchema = new mongoose.Schema<IProjectDetail>({
  markdownContent: { type: String, default: "" },
  sections: [
    {
      title: String,
      content: String,
    },
  ],
  galleryImages: [
    {
      url: { type: String, required: true },
      caption: String,
    },
  ],
  demoVideoUrl: String,
});

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    techStack: [String],
    role: { type: String, required: true },
    projectType: {
      type: String,
      enum: ["personal", "freelance", "internship", "client work"],
      default: "personal",
    },
    startDate: { type: Date, required: true },
    endDate: Date,
    isOngoing: { type: Boolean, default: false },
    thumbnailImageUrl: { type: String, default: "" },
    liveUrl: String,
    githubUrl: String,
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    detail: projectDetailSchema,
  },
  { timestamps: true },
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
export type { IProject, IProjectDetail };

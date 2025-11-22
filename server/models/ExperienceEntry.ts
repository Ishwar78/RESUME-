import mongoose from "mongoose";

interface IExperienceEntry {
  companyName: string;
  roleTitle: string;
  employmentType: "full-time" | "part-time" | "internship" | "freelance";
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  descriptionBullets: string[];
  techUsed: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const experienceEntrySchema = new mongoose.Schema<IExperienceEntry>(
  {
    companyName: { type: String, required: true },
    roleTitle: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "freelance"],
      default: "full-time",
    },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    isCurrent: { type: Boolean, default: false },
    descriptionBullets: [String],
    techUsed: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const ExperienceEntry = mongoose.model<IExperienceEntry>(
  "ExperienceEntry",
  experienceEntrySchema,
);
export type { IExperienceEntry };

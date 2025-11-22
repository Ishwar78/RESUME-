import mongoose from "mongoose";

interface ISocialLink {
  type: "github" | "linkedin" | "twitter" | "email" | "website";
  label: string;
  url: string;
}

interface IAboutSection {
  name: string;
  headline: string;
  shortSummary: string;
  longDescription: string;
  location: string;
  yearsOfExperience: number;
  profilePhotoUrl: string;
  resumeFileUrl: string;
  socialLinks: ISocialLink[];
  updatedAt: Date;
}

const socialLinkSchema = new mongoose.Schema<ISocialLink>({
  type: {
    type: String,
    enum: ["github", "linkedin", "twitter", "email", "website"],
    required: true,
  },
  label: { type: String, required: true },
  url: { type: String, required: true },
});

const aboutSectionSchema = new mongoose.Schema<IAboutSection>(
  {
    name: { type: String, required: true },
    headline: { type: String, required: true },
    shortSummary: { type: String, required: true },
    longDescription: { type: String, required: true },
    location: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true, default: 0 },
    profilePhotoUrl: { type: String, default: "" },
    resumeFileUrl: { type: String, default: "" },
    socialLinks: [socialLinkSchema],
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const AboutSection = mongoose.model<IAboutSection>(
  "AboutSection",
  aboutSectionSchema,
);
export type { IAboutSection, ISocialLink };

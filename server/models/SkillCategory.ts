import mongoose from "mongoose";

interface ISkill {
  label: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon?: string;
  showInHighlights: boolean;
}

interface ISkillCategory {
  name: string;
  order: number;
  skills: ISkill[];
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new mongoose.Schema<ISkill>({
  label: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Intermediate",
  },
  icon: { type: String, default: "" },
  showInHighlights: { type: Boolean, default: false },
});

const skillCategorySchema = new mongoose.Schema<ISkillCategory>(
  {
    name: { type: String, required: true, unique: true },
    order: { type: Number, required: true, default: 0 },
    skills: [skillSchema],
  },
  { timestamps: true },
);

export const SkillCategory = mongoose.model<ISkillCategory>(
  "SkillCategory",
  skillCategorySchema,
);
export type { ISkillCategory, ISkill };

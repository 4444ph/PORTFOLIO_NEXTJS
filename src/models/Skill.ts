import mongoose, { Schema, model, models } from 'mongoose';

export interface ISkill {
  category: string; // e.g., "FRONTEND", "MAINFRAME", "NETWORK", "VISUALS"
  name: string;
  items: string[]; // e.g., ["React.js // Vue", "Tailwind // CSS3"]
  icon: string; // Material icon name
  order: number;
}

const SkillSchema = new Schema<ISkill>({
  category: { type: String, required: true },
  name: { type: String, required: true },
  items: { type: [String], required: true },
  icon: { type: String, required: true },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export const Skill = models.Skill || model<ISkill>('Skill', SkillSchema);

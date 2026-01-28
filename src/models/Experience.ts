import mongoose, { Schema, model, models } from 'mongoose';

export interface IExperience {
  title: string;
  company: string;
  period: string; // e.g., "2023 - PRESENT"
  description?: string;
  borderColor: string; // e.g., "neon-pink", "primary", "electric-orange"
  order: number;
}

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String },
  borderColor: { type: String, required: true },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export const Experience = models.Experience || model<IExperience>('Experience', ExperienceSchema);

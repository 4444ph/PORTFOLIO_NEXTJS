import mongoose, { Schema, model, models } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  imageUrl?: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // Optional for testing
  techStack: { type: [String], required: true },
  demoUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

// Force model rebuild to update schema changes (required validation)
if (models.Project) {
  delete models.Project;
}

export const Project = model<IProject>('Project', ProjectSchema);

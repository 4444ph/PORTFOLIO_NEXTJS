import mongoose, { Schema, model, models } from 'mongoose';

export interface IHeroContent {
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
  resumeData?: Buffer;
  resumeContentType?: string;
  resumeFileName?: string;
}

const HeroContentSchema = new Schema<IHeroContent>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // Optional for testing
  ctaText: { type: String, required: true },
  ctaLink: { type: String, required: true },
  resumeData: { type: Buffer },
  resumeContentType: { type: String },
  resumeFileName: { type: String },
}, {
  timestamps: true,
});

// Force model rebuild to update schema changes (required validation)
if (models.HeroContent) {
  delete models.HeroContent;
}

export const HeroContent = model<IHeroContent>('HeroContent', HeroContentSchema);

import { Schema, model, models } from 'mongoose';

export interface IVisitor {
  ip: string;
  date: string; // YYYY-MM-DD — used for daily dedup
  path: string;
  visitedAt: Date;
}

const VisitorSchema = new Schema<IVisitor>({
  ip:        { type: String, required: true },
  date:      { type: String, required: true }, // e.g. "2025-07-13"
  path:      { type: String, default: '/' },
  visitedAt: { type: Date, default: Date.now },
});

// Unique compound index — same IP on the same date = 1 unique visitor
VisitorSchema.index({ ip: 1, date: 1 }, { unique: true });

export const Visitor = models.Visitor || model<IVisitor>('Visitor', VisitorSchema);

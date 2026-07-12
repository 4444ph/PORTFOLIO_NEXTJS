import { Schema, model, models } from 'mongoose';

export interface IConfig {
  key: string;
  value: string;
}

const ConfigSchema = new Schema<IConfig>({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
}, {
  timestamps: true,
});

export const Config = models.Config || model<IConfig>('Config', ConfigSchema);

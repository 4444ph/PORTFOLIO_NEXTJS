import crypto from 'crypto';
import dbConnect from './db';
import { Config } from '@/models/Config';

// In-process cache so we only hit MongoDB once per server lifecycle
let cachedSecret: string | null = null;

/**
 * Returns the JWT signing secret.
 * - First call: connects to MongoDB, reads the stored secret.
 * - If no secret exists (first boot), generates a 128-char hex secret,
 *   saves it to MongoDB, and returns it.
 * - Subsequent calls: returns the in-memory cached value instantly.
 */
export async function getJwtSecret(): Promise<string> {
  if (cachedSecret) return cachedSecret;

  await dbConnect();

  let config = await Config.findOne({ key: 'jwt_secret' });

  if (!config) {
    const newSecret = crypto.randomBytes(64).toString('hex');
    config = await Config.create({ key: 'jwt_secret', value: newSecret });
    console.log('[auth] JWT secret auto-generated and stored in MongoDB.');
  }

  cachedSecret = config.value as string;
  return cachedSecret;
}

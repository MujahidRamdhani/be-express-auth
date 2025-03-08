import bcrypt from 'bcrypt';
import Logger from '../pkg/logger';

const SALT_ROUNDS = 10;

// Hash password function
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    Logger.error(`hashPassword: Failed to hash password - ${err}`);
    throw new Error('Failed to hash password');
  }
}

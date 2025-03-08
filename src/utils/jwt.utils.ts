import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Logger from '../pkg/logger';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET';
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export interface UserPayload {
  id: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

// 🔹 Buat Access Token
export function createAccessToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN });
}

// 🔹 Buat Refresh Token
export function createRefreshToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}

// 🔹 Verifikasi Access Token
export function verifyAccessToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET) as UserPayload;
  } catch (err) {
    Logger.error(`verifyAccessToken: Invalid token - ${err}`);
    return null;
  }
}

// 🔹 Verifikasi Refresh Token (Tambahkan fungsi ini)
export function verifyRefreshToken(refreshToken: string): UserPayload | null {
  try {
    return jwt.verify(refreshToken, JWT_REFRESH_SECRET) as UserPayload;
  } catch (err) {
    Logger.error(`verifyRefreshToken: Invalid refresh token - ${err}`);
    return null;
  }
}

// 🔹 Middleware autentikasi
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const user = verifyAccessToken(token);
  if (!user) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  (req as AuthenticatedRequest).user = user;
  next();
}

// 🔹 Handler untuk Refresh Token
export function refreshTokenHandler(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  // ✅ Gunakan verifyRefreshToken, bukan verifyAccessToken
  const user = verifyRefreshToken(refreshToken);
  if (!user) {
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }

  // Buat access token & refresh token baru
  const newAccessToken = createAccessToken(user);
  const newRefreshToken = createRefreshToken(user);

  return res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
}

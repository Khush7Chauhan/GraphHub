import jwt from 'jsonwebtoken';
import type { Request } from 'express';
const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthTokenPayload {
  userId: string;
}

export const getAuthenticatedUser = (req: Request): AuthTokenPayload | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : authHeader;

  if (!token) {
    return null;
  }

  try {
    if (!JWT_SECRET) {
      return null;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as AuthTokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
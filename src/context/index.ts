import { prisma } from '../db.js';
import jwt from 'jsonwebtoken';
import { createUserLoaders } from '../loaders/user.loader.js'; 

import * as userService from '../services/user.service.js';
import * as repoService from '../services/repo.service.js';
import * as issueService from '../services/issue.service.js';
import * as authService from '../services/auth.service.js'; 

export interface Context {
  prisma: typeof prisma;
  userId: string | null;
  services: {
    userService: typeof userService;
    repoService: typeof repoService;
    issueService: typeof issueService;
    authService: typeof authService;
  };
  loaders: ReturnType<typeof createUserLoaders>;
}

const getUserIdFromToken = (authHeader?: string): string | null => {
  if (!authHeader) return null;
  if (!authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];

  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET || 'super_secret_key';
    const decoded = jwt.verify(token, secret) as { userId: string };
    return decoded.userId;
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

export const buildContext = async ({ req }: { req: any }): Promise<Context> => {
  console.log("=== INCOMING HEADERS ===", req.headers.authorization);
  const authHeader = req.headers.authorization;
  const userId = getUserIdFromToken(authHeader);
  console.log("=== EXTRACTED USER ID ===", userId);

  return {
    prisma,
    userId,
    services: {
      userService,
      repoService,
      issueService,
      authService,
    },
    loaders: createUserLoaders(prisma),
  };
};
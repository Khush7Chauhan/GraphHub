import { prisma } from '../db.js';
import jwt from 'jsonwebtoken';
import { createUserLoaders } from '../loaders/user.loader.js';
// Import your services
import * as userService from '../services/user.service.js';
import * as repoService from '../services/repo.service.js';
import * as issueService from '../services/issue.service.js';
import * as authService from '../services/auth.service.js';
/**
 * Extracts and verifies the JWT token from the Authorization header.
 * Expected format: "Bearer <token>"
 */
const getUserIdFromToken = (authHeader) => {
    if (!authHeader)
        return null;
    // ✅ FIXED: Safer extraction that splits exactly at the space
    if (!authHeader.startsWith('Bearer '))
        return null;
    const token = authHeader.split(' ')[1];
    if (!token)
        return null;
    try {
        const secret = process.env.JWT_SECRET || 'super_secret_key';
        const decoded = jwt.verify(token, secret);
        return decoded.userId;
    }
    catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
};
/**
 * This function runs once for every single GraphQL request.
 */
export const buildContext = async ({ req }) => {
    console.log("=== INCOMING HEADERS ===", req.headers.authorization);
    // Express generally lowercases headers, so we check 'authorization'
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
//# sourceMappingURL=index.js.map
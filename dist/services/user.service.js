import { prisma } from '../db.js';
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error('User not found.');
    }
    return user;
};
export const getAllUsers = async ({ limit = 10, offset = 0 } = {}) => {
    return prisma.user.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
    });
};
export const updateUser = async (id, data) => {
    // 1. Dynamically build the OR array so undefined values are never passed
    const orConditions = [];
    if (data.username !== undefined) {
        orConditions.push({ username: data.username });
    }
    if (data.email !== undefined) {
        orConditions.push({ email: data.email });
    }
    // 2. Only run the collision check if there are actually fields to check
    if (orConditions.length > 0) {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: orConditions,
                NOT: { id },
            },
        });
        if (existingUser) {
            if (existingUser.username === data.username) {
                throw new Error('Username is already taken.');
            }
            if (existingUser.email === data.email) {
                throw new Error('Email is already in use.');
            }
        }
    }
    // 3. Conditionally spread the data payload to strip out undefined keys safely
    return prisma.user.update({
        where: { id },
        data: {
            ...(data.username !== undefined && { username: data.username }),
            ...(data.email !== undefined && { email: data.email }),
        },
    });
};
export const deleteUser = async (id) => {
    try {
        await prisma.user.delete({
            where: { id },
        });
        return true;
    }
    catch (error) {
        throw new Error('Failed to delete user account.');
    }
};
//# sourceMappingURL=user.service.js.map
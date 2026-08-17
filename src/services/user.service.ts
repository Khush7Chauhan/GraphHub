import { prisma } from '../db.js';
import pkg from "@prisma/client";
const { PrismaClient } = pkg as any;

export interface UpdateUserInput {
  username?: string;
  email?: string;
}

export interface PaginationParams {
  limit?: number | undefined;
  offset?: number | undefined;
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  return user;
};

export const getAllUsers = async ({ limit = 10, offset = 0 }: PaginationParams = {}) => {
  return prisma.user.findMany({
    take: limit,
    skip: offset,
    orderBy: { createdAt: 'desc' },
  });
};

export const updateUser = async (id: string, data: UpdateUserInput) => {
  const orConditions = [];
  if (data.username !== undefined) {
    orConditions.push({ username: data.username });
  }
  if (data.email !== undefined) {
    orConditions.push({ email: data.email });
  }

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

  return prisma.user.update({
    where: { id },
    data: {
      ...(data.username !== undefined && { username: data.username }),
      ...(data.email !== undefined && { email: data.email }),
    },
  });
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw new Error('Failed to delete user account.');
  }
};
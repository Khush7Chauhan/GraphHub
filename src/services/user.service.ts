import pkg from "@prisma/client";
const { PrismaClient } = pkg as any;
const prisma = new PrismaClient();

export interface UpdateUserInput {
  username?: string;
  email?: string;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
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
  if (data.username || data.email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email },
        ],
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
    data,
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
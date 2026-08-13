import pkg from "@prisma/client";
const { PrismaClient } = pkg as any;
const prisma = new PrismaClient();

export interface CreateRepoInput {
  name: string;
  description?: string;
  isPrivate?: boolean;
}

export interface UpdateRepoInput {
  name?: string;
  description?: string;
  isPrivate?: boolean;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export const getRepoById = async (id: string) => {
  const repo = await prisma.repo.findUnique({
    where: { id },
  });

  if (!repo) {
    throw new Error('Repository not found.');
  }

  return repo;
};

export const getAllRepos = async ({ limit = 10, offset = 0 }: PaginationParams = {}) => {
  return prisma.repo.findMany({
    where: {
      isPrivate: false,
    },
    take: limit,
    skip: offset,
    orderBy: { createdAt: 'desc' },
  });
};

export const getReposByUserId = async (userId: string) => {
  return prisma.repo.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const createRepo = async (userId: string, data: CreateRepoInput) => {
  const existingRepo = await prisma.repo.findUnique({
    where: {
      ownerId_name: {
        ownerId: userId,
        name: data.name,
      },
    },
  });

  if (existingRepo) {
    throw new Error(`You already have a repository named "${data.name}".`);
  }

  return prisma.repo.create({
    data: {
      ...data,
      ownerId: userId,
    },
  });
};

export const updateRepo = async (userId: string, repoId: string, data: UpdateRepoInput) => {
  const repo = await getRepoById(repoId);

  if (repo.ownerId !== userId) {
    throw new Error('Unauthorized: You can only update your own repositories.');
  }

  if (data.name && data.name !== repo.name) {
    const nameConflict = await prisma.repo.findUnique({
      where: {
        ownerId_name: {
          ownerId: userId,
          name: data.name,
        },
      },
    });

    if (nameConflict) {
      throw new Error(`You already have a repository named "${data.name}".`);
    }
  }

  return prisma.repo.update({
    where: { id: repoId },
    data,
  });
};


export const deleteRepo = async (userId: string, repoId: string) => {
  const repo = await getRepoById(repoId);
  if (repo.ownerId !== userId) {
    throw new Error('Unauthorized: You can only delete your own repositories.');
  }
  await prisma.repo.delete({
    where: { id: repoId },
  });
  return true;
};
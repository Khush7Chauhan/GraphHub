import pkg from "@prisma/client";
const { PrismaClient } = pkg as any;
const prisma = new PrismaClient();

export interface CreateRepoInput {
    name : string;
    descriptive? : string;
    isPrivate?: boolean;
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


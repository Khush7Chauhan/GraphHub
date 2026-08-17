import { prisma } from '../db.js';
import pkg from "@prisma/client"; 
const { PrismaClient } = pkg as any; 

export interface CreateIssueInput {
  title: string;
  body?: string;
  repoId: string;
}

export interface UpdateIssueInput {
  title?: string;
  body?: string;
  status?: 'OPEN' | 'CLOSED';
}

export interface PaginationParams {
  limit?: number | undefined;
  offset?: number | undefined;
}

/**
 * Fetches a single issue by its ID.
 */
export const getIssueById = async (id: string) => {
  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    throw new Error('Issue not found.');
  }

  return issue;
};

export const getIssuesByRepo = async (repoId: string, { limit = 10, offset = 0 }: PaginationParams = {}) => {
  return prisma.issue.findMany({
    where: { repoId },
    take: limit,
    skip: offset,
    orderBy: { createdAt: 'desc' },
  });
};

export const getIssuesByUserId = async (userId: string) => {
  return prisma.issue.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' },
  });
};


export const createIssue = async (userId: string, data: CreateIssueInput) => {
  const repo = await prisma.repo.findUnique({ where: { id: data.repoId } });
  
  if (!repo) {
    throw new Error('Repository not found.');
  }

  return prisma.issue.create({
    data: {
      title: data.title,
      body: data.body ?? null,
      repoId: data.repoId,
      authorId: userId,
    },
  });
};

export const updateIssue = async (userId: string, issueId: string, data: UpdateIssueInput) => {
  const issue = await getIssueById(issueId);
  if (issue.authorId !== userId) {
    throw new Error('Unauthorized: You can only update your own issues.');
  }

  return prisma.issue.update({
    where: { id: issueId },
    data,
  });
};

export const deleteIssue = async (userId: string, issueId: string) => {
  const issue = await getIssueById(issueId);
  if (issue.authorId !== userId) {
    throw new Error('Unauthorized: You can only delete your own issues.');
  }

  await prisma.issue.delete({
    where: { id: issueId },
  });
  
  return true;
};

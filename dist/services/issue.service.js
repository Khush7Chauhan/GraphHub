import { prisma } from '../db.js';
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
/**
 * Fetches a single issue by its ID.
 */
export const getIssueById = async (id) => {
    const issue = await prisma.issue.findUnique({
        where: { id },
    });
    if (!issue) {
        throw new Error('Issue not found.');
    }
    return issue;
};
export const getIssuesByRepo = async (repoId, { limit = 10, offset = 0 } = {}) => {
    return prisma.issue.findMany({
        where: { repoId },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
    });
};
export const getIssuesByUserId = async (userId) => {
    return prisma.issue.findMany({
        where: { authorId: userId },
        orderBy: { createdAt: 'desc' },
    });
};
export const createIssue = async (userId, data) => {
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
export const updateIssue = async (userId, issueId, data) => {
    const issue = await getIssueById(issueId);
    if (issue.authorId !== userId) {
        throw new Error('Unauthorized: You can only update your own issues.');
    }
    return prisma.issue.update({
        where: { id: issueId },
        data,
    });
};
export const deleteIssue = async (userId, issueId) => {
    const issue = await getIssueById(issueId);
    if (issue.authorId !== userId) {
        throw new Error('Unauthorized: You can only delete your own issues.');
    }
    await prisma.issue.delete({
        where: { id: issueId },
    });
    return true;
};
//# sourceMappingURL=issue.service.js.map
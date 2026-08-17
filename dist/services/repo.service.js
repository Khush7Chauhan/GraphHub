import { prisma } from '../db.js';
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
export const getRepoById = async (id) => {
    const repo = await prisma.repo.findUnique({
        where: { id },
    });
    if (!repo) {
        throw new Error('Repository not found.');
    }
    return repo;
};
export const getAllRepos = async ({ limit = 10, offset = 0 } = {}) => {
    return prisma.repo.findMany({
        where: {
            isPrivate: false,
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
    });
};
export const getReposByUserId = async (userId) => {
    return prisma.repo.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: 'desc' },
    });
};
export const createRepo = async (userId, data) => {
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
export const updateRepo = async (userId, repoId, data) => {
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
export const deleteRepo = async (userId, repoId) => {
    const repo = await getRepoById(repoId);
    if (repo.ownerId !== userId) {
        throw new Error('Unauthorized: You can only delete your own repositories.');
    }
    await prisma.repo.delete({
        where: { id: repoId },
    });
    return true;
};
//# sourceMappingURL=repo.service.js.map
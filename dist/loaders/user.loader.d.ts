import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
export declare const createUserLoaders: (prisma: PrismaClient) => {
    userIssuesLoader: DataLoader<string, {
        id: string;
        title: string;
        body: string | null;
        status: import("@prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        repoId: string;
    }[], string>;
    userLoader: DataLoader<string, {
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, string>;
};
//# sourceMappingURL=user.loader.d.ts.map
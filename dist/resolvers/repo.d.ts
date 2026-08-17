import { Context } from '../context/index.js';
interface CreateRepoArgs {
    input: {
        name: string;
        description?: string;
        isPrivate?: boolean;
    };
}
interface UpdateRepoArgs {
    id: string;
    input: {
        name?: string;
        description?: string;
        isPrivate?: boolean;
    };
}
interface RepoByIdArgs {
    id: string;
}
interface PaginationArgs {
    limit?: number;
    offset?: number;
}
export declare const repoResolvers: {
    Query: {
        repo: (_: unknown, { id }: RepoByIdArgs, ctx: Context) => Promise<{
            id: string;
            name: string;
            description: string | null;
            isPrivate: boolean;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
        }>;
        repos: (_: unknown, { limit, offset }: PaginationArgs, ctx: Context) => Promise<{
            id: string;
            name: string;
            description: string | null;
            isPrivate: boolean;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
        }[]>;
    };
    Mutation: {
        createRepo: (_: unknown, { input }: CreateRepoArgs, ctx: Context) => Promise<{
            id: string;
            name: string;
            description: string | null;
            isPrivate: boolean;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
        }>;
        updateRepo: (_: unknown, { id, input }: UpdateRepoArgs, ctx: Context) => Promise<{
            id: string;
            name: string;
            description: string | null;
            isPrivate: boolean;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
        }>;
        deleteRepo: (_: unknown, { id }: RepoByIdArgs, ctx: Context) => Promise<boolean>;
    };
    Repo: {
        owner: (parent: {
            ownerId: string;
        }, _: unknown, ctx: Context) => Promise<{
            id: string;
            username: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }>;
        issues: (parent: {
            id: string;
        }, _: unknown, ctx: Context) => Promise<{
            id: string;
            title: string;
            body: string | null;
            status: import("@prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
            authorId: string;
            repoId: string;
        }[]>;
    };
};
export {};
//# sourceMappingURL=repo.d.ts.map
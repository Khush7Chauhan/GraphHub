import { Context } from '../context/index.js';
interface CreateIssueArgs {
    input: {
        title: string;
        body?: string;
        repoId: string;
    };
}
interface UpdateIssueArgs {
    id: string;
    input: {
        title?: string;
        body?: string;
        status?: 'OPEN' | 'CLOSED';
    };
}
interface IssueByIdArgs {
    id: string;
}
interface IssuesByRepoArgs {
    repoId: string;
    limit?: number;
    offset?: number;
}
export declare const issueResolvers: {
    Query: {
        issue: (_: unknown, { id }: IssueByIdArgs, ctx: Context) => Promise<{
            id: string;
            title: string;
            body: string | null;
            status: import("@prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
            authorId: string;
            repoId: string;
        }>;
        issuesByRepo: (_: unknown, { repoId, limit, offset }: IssuesByRepoArgs, ctx: Context) => Promise<{
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
    Mutation: {
        createIssue: (_: unknown, { input }: CreateIssueArgs, ctx: Context) => Promise<{
            id: string;
            title: string;
            body: string | null;
            status: import("@prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
            authorId: string;
            repoId: string;
        }>;
        updateIssue: (_: unknown, { id, input }: UpdateIssueArgs, ctx: Context) => Promise<{
            id: string;
            title: string;
            body: string | null;
            status: import("@prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
            authorId: string;
            repoId: string;
        }>;
        deleteIssue: (_: unknown, { id }: IssueByIdArgs, ctx: Context) => Promise<boolean>;
    };
    Issue: {
        author: (parent: {
            authorId: string;
        }, _: unknown, ctx: Context) => Promise<{
            id: string;
            username: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }>;
        repo: (parent: {
            repoId: string;
        }, _: unknown, ctx: Context) => Promise<{
            id: string;
            name: string;
            description: string | null;
            isPrivate: boolean;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
        }>;
    };
};
export {};
//# sourceMappingURL=issue.d.ts.map
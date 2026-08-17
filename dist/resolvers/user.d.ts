import { Context } from '../context/index.js';
interface RegisterArgs {
    input: {
        username: string;
        email: string;
        password: string;
    };
}
interface LoginArgs {
    input: {
        email: string;
        password: string;
    };
}
interface UpdateUserArgs {
    input: {
        username?: string;
        email?: string;
    };
}
interface UserByIdArgs {
    id: string;
}
interface PaginationArgs {
    limit?: number;
    offset?: number;
}
export declare const userResolvers: {
    Query: {
        me: (_: unknown, __: unknown, ctx: Context) => Promise<{
            id: string;
            username: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }>;
        user: (_: unknown, { id }: UserByIdArgs, ctx: Context) => Promise<{
            id: string;
            username: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }>;
        users: (_: unknown, { limit, offset }: PaginationArgs, ctx: Context) => Promise<{
            id: string;
            username: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }[]>;
    };
    Mutation: {
        register: (_: unknown, { input }: RegisterArgs, ctx: Context) => Promise<{
            token: string;
            user: {
                id: string;
                username: string;
                email: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
        login: (_: unknown, { input }: LoginArgs, ctx: Context) => Promise<{
            token: string;
            user: {
                id: string;
                username: string;
                email: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
        updateUser: (_: unknown, { input }: UpdateUserArgs, ctx: Context) => Promise<{
            id: string;
            username: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        }>;
        deleteUser: (_: unknown, __: unknown, ctx: Context) => Promise<boolean>;
    };
    User: {
        repos: (parent: {
            id: string;
        }, _: unknown, ctx: Context) => Promise<{
            id: string;
            name: string;
            description: string | null;
            isPrivate: boolean;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
        }[]>;
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
//# sourceMappingURL=user.d.ts.map
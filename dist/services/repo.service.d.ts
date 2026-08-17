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
    limit?: number | undefined;
    offset?: number | undefined;
}
export declare const getRepoById: (id: string) => Promise<{
    id: string;
    name: string;
    description: string | null;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
}>;
export declare const getAllRepos: ({ limit, offset }?: PaginationParams) => Promise<{
    id: string;
    name: string;
    description: string | null;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
}[]>;
export declare const getReposByUserId: (userId: string) => Promise<{
    id: string;
    name: string;
    description: string | null;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
}[]>;
export declare const createRepo: (userId: string, data: CreateRepoInput) => Promise<{
    id: string;
    name: string;
    description: string | null;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
}>;
export declare const updateRepo: (userId: string, repoId: string, data: UpdateRepoInput) => Promise<{
    id: string;
    name: string;
    description: string | null;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
}>;
export declare const deleteRepo: (userId: string, repoId: string) => Promise<boolean>;
//# sourceMappingURL=repo.service.d.ts.map
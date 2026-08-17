import pkg from "@prisma/client";
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
export declare const getIssueById: (id: string) => Promise<{
    id: string;
    title: string;
    body: string | null;
    status: pkg.$Enums.Status;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    repoId: string;
}>;
export declare const getIssuesByRepo: (repoId: string, { limit, offset }?: PaginationParams) => Promise<{
    id: string;
    title: string;
    body: string | null;
    status: pkg.$Enums.Status;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    repoId: string;
}[]>;
export declare const getIssuesByUserId: (userId: string) => Promise<{
    id: string;
    title: string;
    body: string | null;
    status: pkg.$Enums.Status;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    repoId: string;
}[]>;
export declare const createIssue: (userId: string, data: CreateIssueInput) => Promise<{
    id: string;
    title: string;
    body: string | null;
    status: pkg.$Enums.Status;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    repoId: string;
}>;
export declare const updateIssue: (userId: string, issueId: string, data: UpdateIssueInput) => Promise<{
    id: string;
    title: string;
    body: string | null;
    status: pkg.$Enums.Status;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    repoId: string;
}>;
export declare const deleteIssue: (userId: string, issueId: string) => Promise<boolean>;
//# sourceMappingURL=issue.service.d.ts.map
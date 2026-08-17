export interface UpdateUserInput {
    username?: string;
    email?: string;
}
export interface PaginationParams {
    limit?: number | undefined;
    offset?: number | undefined;
}
export declare const getUserById: (id: string) => Promise<{
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAllUsers: ({ limit, offset }?: PaginationParams) => Promise<{
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const updateUser: (id: string, data: UpdateUserInput) => Promise<{
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteUser: (id: string) => Promise<boolean>;
//# sourceMappingURL=user.service.d.ts.map
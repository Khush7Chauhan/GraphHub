export interface RegisterInput {
    username: string;
    email: string;
    password: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
/**
 * Registers a new user, hashes their password, and returns a token + user data.
 */
export declare const register: (data: RegisterInput) => Promise<{
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
/**
 * Verifies a user's credentials and returns a token + user data.
 */
export declare const login: (data: LoginInput) => Promise<{
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
//# sourceMappingURL=auth.service.d.ts.map
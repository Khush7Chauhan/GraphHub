import type { Request } from 'express';
export interface AuthTokenPayload {
    userId: string;
}
export declare const getAuthenticatedUser: (req: Request) => AuthTokenPayload | null;
//# sourceMappingURL=auth.d.ts.map
import { prisma } from '../db.js';
import { createUserLoaders } from '../loaders/user.loader.js';
import * as userService from '../services/user.service.js';
import * as repoService from '../services/repo.service.js';
import * as issueService from '../services/issue.service.js';
import * as authService from '../services/auth.service.js';
export interface Context {
    prisma: typeof prisma;
    userId: string | null;
    services: {
        userService: typeof userService;
        repoService: typeof repoService;
        issueService: typeof issueService;
        authService: typeof authService;
    };
    loaders: ReturnType<typeof createUserLoaders>;
}
/**
 * This function runs once for every single GraphQL request.
 */
export declare const buildContext: ({ req }: {
    req: any;
}) => Promise<Context>;
//# sourceMappingURL=index.d.ts.map
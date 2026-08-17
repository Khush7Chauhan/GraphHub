export const userResolvers = {
    Query: {
        me: async (_, __, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in.');
            }
            return ctx.services.userService.getUserById(ctx.userId);
        },
        user: async (_, { id }, ctx) => {
            return ctx.services.userService.getUserById(id);
        },
        users: async (_, { limit, offset }, ctx) => {
            return ctx.services.userService.getAllUsers({ limit, offset });
        },
    },
    Mutation: {
        register: async (_, { input }, ctx) => {
            return ctx.services.authService.register(input);
        },
        login: async (_, { input }, ctx) => {
            return ctx.services.authService.login(input);
        },
        updateUser: async (_, { input }, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in.');
            }
            return ctx.services.userService.updateUser(ctx.userId, input);
        },
        deleteUser: async (_, __, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in.');
            }
            return ctx.services.userService.deleteUser(ctx.userId);
        },
    },
    User: {
        repos: async (parent, _, ctx) => {
            return ctx.services.repoService.getReposByUserId(parent.id);
        },
        issues: async (parent, _, ctx) => {
            if (ctx.loaders?.userIssuesLoader) {
                return ctx.loaders.userIssuesLoader.load(parent.id);
            }
            return ctx.prisma.issue.findMany({
                where: { authorId: parent.id }
            });
        },
    },
};
//# sourceMappingURL=user.js.map
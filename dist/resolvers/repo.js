export const repoResolvers = {
    Query: {
        repo: async (_, { id }, ctx) => {
            return ctx.services.repoService.getRepoById(id);
        },
        repos: async (_, { limit, offset }, ctx) => {
            return ctx.services.repoService.getAllRepos({ limit, offset });
        },
    },
    Mutation: {
        createRepo: async (_, { input }, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in to create a repository.');
            }
            return ctx.services.repoService.createRepo(ctx.userId, input);
        },
        updateRepo: async (_, { id, input }, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in.');
            }
            return ctx.services.repoService.updateRepo(ctx.userId, id, input);
        },
        deleteRepo: async (_, { id }, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in.');
            }
            return ctx.services.repoService.deleteRepo(ctx.userId, id);
        },
    },
    Repo: {
        owner: async (parent, _, ctx) => {
            return ctx.services.userService.getUserById(parent.ownerId);
        },
        issues: async (parent, _, ctx) => {
            return ctx.prisma.issue.findMany({
                where: { repoId: parent.id },
            });
        },
    },
};
//# sourceMappingURL=repo.js.map
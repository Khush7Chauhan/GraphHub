export const issueResolvers = {
    Query: {
        // Delegates to issueService
        issue: async (_, { id }, ctx) => {
            return ctx.services.issueService.getIssueById(id);
        },
        // Delegates to issueService with pagination
        issuesByRepo: async (_, { repoId, limit, offset }, ctx) => {
            return ctx.services.issueService.getIssuesByRepo(repoId, { limit, offset });
        },
    },
    Mutation: {
        // Delegates to issueService
        createIssue: async (_, { input }, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in to create an issue.');
            }
            return ctx.services.issueService.createIssue(ctx.userId, input);
        },
        // Delegates to issueService
        updateIssue: async (_, { id, input }, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in to update an issue.');
            }
            return ctx.services.issueService.updateIssue(ctx.userId, id, input);
        },
        // Delegates to issueService
        deleteIssue: async (_, { id }, ctx) => {
            if (!ctx.userId) {
                throw new Error('Unauthorized: You must be logged in to delete an issue.');
            }
            return ctx.services.issueService.deleteIssue(ctx.userId, id);
        },
    },
    Issue: {
        // Resolves the 'author' field using userService
        author: async (parent, _, ctx) => {
            return ctx.services.userService.getUserById(parent.authorId);
        },
        // Resolves the 'repo' field using repoService
        repo: async (parent, _, ctx) => {
            return ctx.services.repoService.getRepoById(parent.repoId);
        },
    },
};
//# sourceMappingURL=issue.js.map
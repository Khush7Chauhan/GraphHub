import { Context } from '../context/index.js';

interface CreateIssueArgs {
  input: {
    title: string;
    body?: string;
    repoId: string;
  };
}

interface UpdateIssueArgs {
  id: string;
  input: {
    title?: string;
    body?: string;
    status?: 'OPEN' | 'CLOSED';
  };
}

interface IssueByIdArgs {
  id: string;
}

interface IssuesByRepoArgs {
  repoId: string;
  limit?: number;
  offset?: number;
}

export const issueResolvers = {
  Query: {
    issue: async (_: unknown, { id }: IssueByIdArgs, ctx: Context) => {
      return ctx.services.issueService.getIssueById(id);
    },

    issuesByRepo: async (_: unknown, { repoId, limit, offset }: IssuesByRepoArgs, ctx: Context) => {
      return ctx.services.issueService.getIssuesByRepo(repoId, { limit, offset });
    },
  },

  Mutation: {
    createIssue: async (_: unknown, { input }: CreateIssueArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in to create an issue.');
      }
      return ctx.services.issueService.createIssue(ctx.userId, input);
    },

    updateIssue: async (_: unknown, { id, input }: UpdateIssueArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in to update an issue.');
      }
      return ctx.services.issueService.updateIssue(ctx.userId, id, input);
    },

    deleteIssue: async (_: unknown, { id }: IssueByIdArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in to delete an issue.');
      }
      return ctx.services.issueService.deleteIssue(ctx.userId, id);
    },
  },

  Issue: {
    author: async (parent: { authorId: string }, _: unknown, ctx: Context) => {
      return ctx.services.userService.getUserById(parent.authorId);
    },

    repo: async (parent: { repoId: string }, _: unknown, ctx: Context) => {
      return ctx.services.repoService.getRepoById(parent.repoId);
    },
  },
};
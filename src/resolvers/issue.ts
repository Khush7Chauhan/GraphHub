import { Context } from '../context';

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
      return ctx.prisma.issue.findUnique({
        where: { id },
      });
    },

    issuesByRepo: async (_: unknown, { repoId, limit, offset }: IssuesByRepoArgs, ctx: Context) => {
      return ctx.prisma.issue.findMany({
        where: { repoId },
        take: limit ?? 10,  
        skip: offset ?? 0, 
        orderBy: { createdAt: 'desc' },
      });
    },
  },

  Mutation: {
    createIssue: async (_: unknown, { input }: CreateIssueArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in to create an issue.');
      }

      return ctx.prisma.issue.create({
        data: {
          title: input.title,
          body: input.body,
          repoId: input.repoId,
          authorId: ctx.userId, 
        },
      });
    },

    updateIssue: async (_: unknown, { id, input }: UpdateIssueArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in to update an issue.');
      }

      return ctx.prisma.issue.update({
        where: { id },
        data: input,
      });
    },

    deleteIssue: async (_: unknown, { id }: IssueByIdArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in to delete an issue.');
      }

      await ctx.prisma.issue.delete({
        where: { id },
      });
      return true;
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
import { Context } from '../context';

interface CreateRepoArgs {
  input: {
    name: string;
    description?: string;
    isPrivate?: boolean;
  };
}

interface UpdateRepoArgs {
  id: string;
  input: {
    name?: string;
    description?: string;
    isPrivate?: boolean;
  };
}

interface RepoByIdArgs {
  id: string;
}

export const repoResolvers = {
  Query: {
    repo: async (_: unknown, { id }: RepoByIdArgs, ctx: Context) => {
      return ctx.services.repoService.getRepoById(id);
    },
    repos: async (_: unknown, __: unknown, ctx: Context) => {
      return ctx.services.repoService.getAllRepos();
    },
  },

  Mutation: {
    createRepo: async (_: unknown, { input }: CreateRepoArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in to create a repository.');
      }
      return ctx.services.repoService.createRepo(ctx.userId, input);
    },

    updateRepo: async (_: unknown, { id, input }: UpdateRepoArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in.');
      }
      return ctx.services.repoService.updateRepo(ctx.userId, id, input);
    },

    deleteRepo: async (_: unknown, { id }: RepoByIdArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in.');
      }
      return ctx.services.repoService.deleteRepo(ctx.userId, id);
    },
  },

  Repo: {
    owner: async (parent: { ownerId: string }, _: unknown, ctx: Context) => {
      return ctx.services.userService.getUserById(parent.ownerId);
    },
    issues: async (parent: { id: string }, _: unknown, ctx: Context) => {
      return ctx.prisma.issue.findMany({
        where: { repoId: parent.id },
      });
    },
  },
};
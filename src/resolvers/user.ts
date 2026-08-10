import { Context } from '../context';

interface RegisterArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginArgs {
  input: {
    email: string;
    password: string;
  };
}

interface UpdateUserArgs {
  input: {
    username?: string;
    email?: string;
  };
}

interface UserByIdArgs {
  id: string;
}

export const userResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in.');
      }
      return ctx.services.userService.getUserById(ctx.userId);
    },

    user: async (_: unknown, { id }: UserByIdArgs, ctx: Context) => {
      return ctx.services.userService.getUserById(id);
    },

    users: async (_: unknown, __: unknown, ctx: Context) => {
      return ctx.services.userService.getAllUsers();
    },
  },

  Mutation: {
    register: async (_: unknown, { input }: RegisterArgs, ctx: Context) => {
      return ctx.services.authService.register(input);
    },
    login: async (_: unknown, { input }: LoginArgs, ctx: Context) => {
      return ctx.services.authService.login(input);
    },
    updateUser: async (_: unknown, { input }: UpdateUserArgs, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in.');
      }
      return ctx.services.userService.updateUser(ctx.userId, input);
    },

    deleteUser: async (_: unknown, __: unknown, ctx: Context) => {
      if (!ctx.userId) {
        throw new Error('Unauthorized: You must be logged in.');
      }
      return ctx.services.userService.deleteUser(ctx.userId);
    },
  },

  User: {
    repos: async (parent: { id: string }, _: unknown, ctx: Context) => {
      return ctx.services.repoService.getReposByUserId(parent.id);
    },

    issues: async (parent: { id: string }, _: unknown, ctx: Context) => {
      if (ctx.loaders?.userIssuesLoader) {
        return ctx.loaders.userIssuesLoader.load(parent.id);
      }
      return ctx.services.issueService.getIssuesByUserId(parent.id);
    },
  },
};
import DataLoader from 'dataloader';
import { Prisma, PrismaClient } from '@prisma/client';

type UserRecord = Prisma.UserGetPayload<{}>;
type IssueRecord = Prisma.IssueGetPayload<{}>;

export const createUserLoaders = (prisma: PrismaClient) => {
  return {
    userIssuesLoader: new DataLoader<string, IssueRecord[]>(async (userIds) => {
      const issues = await prisma.issue.findMany({
        where: {
          authorId: {
            in: [...userIds],
          },
        },
      });

      const issuesByUserId = issues.reduce((map: Record<string, IssueRecord[]>, issue: IssueRecord) => {
        if (!map[issue.authorId]) {
          map[issue.authorId] = [];
        }

        map[issue.authorId]!.push(issue);

        return map;
      }, {} as Record<string, IssueRecord[]>);

      return userIds.map((userId) => issuesByUserId[userId] || []);
    }),

    userLoader: new DataLoader<string, UserRecord | null>(async (userIds) => {
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: [...userIds],
          },
        },
      });

      const userMap = users.reduce((map: Record<string, UserRecord>, user: UserRecord) => {
        map[user.id] = user;
        return map;
      }, {} as Record<string, UserRecord>);

      return userIds.map((userId) => userMap[userId] || null);
    }),
  };
};
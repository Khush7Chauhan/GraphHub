import DataLoader from 'dataloader';
export const createUserLoaders = (prisma) => {
    return {
        userIssuesLoader: new DataLoader(async (userIds) => {
            const issues = await prisma.issue.findMany({
                where: {
                    authorId: {
                        in: [...userIds],
                    },
                },
            });
            const issuesByUserId = issues.reduce((map, issue) => {
                if (!map[issue.authorId]) {
                    map[issue.authorId] = [];
                }
                map[issue.authorId].push(issue);
                return map;
            }, {});
            return userIds.map((userId) => issuesByUserId[userId] || []);
        }),
        userLoader: new DataLoader(async (userIds) => {
            const users = await prisma.user.findMany({
                where: {
                    id: {
                        in: [...userIds],
                    },
                },
            });
            const userMap = users.reduce((map, user) => {
                map[user.id] = user;
                return map;
            }, {});
            return userIds.map((userId) => userMap[userId] || null);
        }),
    };
};
//# sourceMappingURL=user.loader.js.map
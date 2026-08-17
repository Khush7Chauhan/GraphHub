import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
// Import Resolvers
import { userResolvers } from './resolvers/user.js';
import { repoResolvers } from './resolvers/repo.js';
import { issueResolvers } from './resolvers/issue.js';
// Import Context
import { buildContext } from './context/index.js';
// ESM workaround for missing __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const startServer = async () => {
    const app = express();
    // 1. Read GraphQL schemas from the file system
    const userTypeDefs = readFileSync(join(__dirname, 'schema', 'user.graphql'), 'utf-8');
    const repoTypeDefs = readFileSync(join(__dirname, 'schema', 'repo.graphql'), 'utf-8');
    const issueTypeDefs = readFileSync(join(__dirname, 'schema', 'issue.graphql'), 'utf-8');
    // 2. Initialize Apollo Server
    const server = new ApolloServer({
        typeDefs: [userTypeDefs, repoTypeDefs, issueTypeDefs],
        resolvers: [userResolvers, repoResolvers, issueResolvers],
    });
    // 3. Start Apollo Server before applying middleware
    await server.start();
    // 4. Apply middleware to Express
    app.use('/graphql', cors(), express.json(), // Required for Apollo to parse the body
    expressMiddleware(server, {
        context: buildContext,
    }));
    // 5. Start the Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 GraphHub Server ready at http://localhost:${PORT}/graphql`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server:', error);
});
//# sourceMappingURL=server.js.map
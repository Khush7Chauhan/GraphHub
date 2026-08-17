import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { userResolvers } from './resolvers/user.js';
import { repoResolvers } from './resolvers/repo.js';
import { issueResolvers } from './resolvers/issue.js';
import { buildContext, Context } from './context/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startServer = async () => {
  const app = express();

  const userTypeDefs = readFileSync(join(__dirname, 'schema', 'user.graphql'), 'utf-8');
  const repoTypeDefs = readFileSync(join(__dirname, 'schema', 'repo.graphql'), 'utf-8');
  const issueTypeDefs = readFileSync(join(__dirname, 'schema', 'issue.graphql'), 'utf-8');

  const server = new ApolloServer<Context>({
    typeDefs: [userTypeDefs, repoTypeDefs, issueTypeDefs],
    resolvers: [userResolvers, repoResolvers, issueResolvers],
  });

  await server.start();
  app.use(
    '/graphql',
    cors(),
    express.json(), 
    expressMiddleware(server, {
      context: buildContext,
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(` GraphHub Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
});
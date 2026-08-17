declare module '@apollo/server/express4' {
  export function expressMiddleware<TContext>(
    server: import('@apollo/server').ApolloServer<TContext>,
    options?: {
      context?: (expressContext: {
        req: import('express').Request;
        res: import('express').Response;
      }) => Promise<TContext>;
    }
  ): import('express').RequestHandler;
}
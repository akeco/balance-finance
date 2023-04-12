import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Socket } from 'net';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { createYoga } from 'graphql-yoga';
import { useServer } from 'graphql-ws/lib/use/ws';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '@/resolvers';
import { PubSub } from 'graphql-subscriptions';

const PORT = 4000;
const GRAPHQL_SCHEMA_PATH = resolve(__dirname, 'schema.graphql');

const typeDefs = readFileSync(GRAPHQL_SCHEMA_PATH, { encoding: 'utf-8' });
const pubsub = new PubSub();

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const buildApp = () => {
  const yoga = createYoga({
    schema,
    context: ({ request }) => ({
      pubsub,
      request,
    }),
  });

  const server = createServer(yoga);
  const wss = new WebSocketServer({
    server,
    path: yoga.graphqlEndpoint,
  });

  useServer(
    {
      execute: (args: any) => args.execute(args),
      subscribe: (args: any) => args.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          execute,
          subscribe,
        };

        const errors = validate(args.schema, args.document);
        if (errors.length) return errors;
        return args;
      },
    },
    wss,
  );

  const sockets = new Set<Socket>();
  server.on('connection', (socket) => {
    sockets.add(socket);
    server.once('close', () => sockets.delete(socket));
  });

  return {
    start: (port: number) =>
      new Promise<void>((resolve, reject) => {
        server.on('error', (err) => reject(err));
        server.on('listening', () => {
          console.log('Server is listening on port 4000');
          resolve();
        });
        server.listen(port);
      }),
    stop: () =>
      new Promise<void>((resolve) => {
        sockets.forEach((socket) => {
          socket.destroy();
          sockets.delete(socket);
        });
        server.close(() => resolve());
      }),
  };
};

async function main() {
  const app = buildApp();
  await app.start(PORT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

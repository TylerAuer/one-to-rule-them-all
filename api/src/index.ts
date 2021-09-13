import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';
import { entities } from './entities';

const PORT = 4000;

main();

async function main() {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'tylerauer',
    password: 'postgres',
    database: 'one-to-rule-them-all',
    entities: entities,
    synchronize: true,
    logging: true,
  }).catch((err) => {
    console.log(err);
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Listening @ http://localhost:${PORT}`);
  });
}

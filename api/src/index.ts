import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { Task } from './entity/Task';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './resolvers/task_resolver';

const PORT = 4000;

main();
async function main() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'tylerauer',
    password: 'postgres',
    database: 'one-to-rule-them-all',
    entities: [Task],
    synchronize: true,
    logging: true,
  }).catch((err) => {
    console.log(err);
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Listening @ http://localhost:${PORT}`);
  });
}

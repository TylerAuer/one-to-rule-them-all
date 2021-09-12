import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './resolvers/task_resolver';
import { Task } from './entities/Task';
import { TaskMessage } from './entities/TaskMessage';

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
    entities: [Task, TaskMessage],
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

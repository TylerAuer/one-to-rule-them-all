import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user_resolvers';
import { Task } from './entities/Task';
import { TaskResolver } from './resolvers/task_resolver';
import { TaskMessage } from './entities/TaskMessage';
import { TaskMessageResolver } from './resolvers/task_message_resolver';

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
    entities: [Task, TaskMessage, User],
    synchronize: true,
    logging: true,
  }).catch((err) => {
    console.log(err);
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver, TaskMessageResolver, UserResolver],
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

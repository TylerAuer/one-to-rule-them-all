import 'reflect-metadata';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { entities } from './entities';
import { createSchema } from './utils/create_schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { CustomContextType } from './types';
import constants from './constants';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
require('dotenv').config();

main();

async function main() {
  const app = express();
  connectToPostgres();
  addRedisMiddleware(app);
  startApolloServer(app);

  app.listen(constants.PORT, () => {
    console.log(`Listening @ http://localhost:${constants.PORT}`);
  });
}

async function connectToPostgres() {
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
}

function addRedisMiddleware(app: Express) {
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        ttl: constants.SESSION_TTL,
      }),
      cookie: {
        maxAge: constants.TIME.YEAR * 2,
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: process.env.NODE_ENV === 'production', // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );
}

async function startApolloServer(app: Express) {
  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }): CustomContextType => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

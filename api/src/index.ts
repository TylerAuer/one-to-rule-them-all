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
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
require('dotenv').config();

main();

async function main() {
  const app = express();
  await connectToPostgres();
  await addRedisMiddleware(app);
  startApolloServer(app);

  app.listen(constants.PORT, () => {
    console.log(`Listening @ http://localhost:${constants.PORT}`);
  });
}

async function connectToPostgres() {
  let retriesAllowed = 10;
  const waitBetweenRetries = 5000;

  while (retriesAllowed) {
    try {
      await createConnection({
        type: 'postgres',
        host: 'postgres://postgres:postgres@postgres:5432/one-to-rule-them-all',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'one-to-rule-them-all',
        entities: entities,
        synchronize: true,
        logging: true,
      });
      console.log('Successfully connected to PostgreSQL');
      break;
    } catch (err) {
      retriesAllowed--;
      console.log(`Failed to connect to PostgreSQL ${retriesAllowed} retries left.`);
      console.log(err);
      await new Promise((resolve) => setTimeout(resolve, waitBetweenRetries));
    }
  }
}

async function addRedisMiddleware(app: Express) {
  let retriesAllowed = 10;
  const waitBetweenRetries = 5000;

  while (retriesAllowed) {
    try {
      const RedisStore = connectRedis(expressSession);
      const redisClient = redis.createClient({
        port: 6379,
        host: 'localhost',
      });
      app.use(
        expressSession({
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
      console.log('Successfully connected to Redis');
      break;
    } catch (err) {
      retriesAllowed--;
      console.log(`Failed to connect to Redis ${retriesAllowed} retries left.`);
      console.log(err);
      await new Promise((resolve) => setTimeout(resolve, waitBetweenRetries));
    }
  }
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

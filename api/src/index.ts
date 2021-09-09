import 'reflect-metadata';
import express from 'express';
import {createConnection} from 'typeorm';
import {User} from './entity/User';

const PORT = 4000;

main();
async function main() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'one-to-rule-them-all',
    entities: [User],
    synchronize: true,
    logging: false,
  }).catch((err) => {
    console.log(err);
  });

  const app = express();
  app.get('/', (_, res) => {
    res.send('Hello World!');
  });

  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });
}

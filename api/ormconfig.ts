import { Task } from './src/entity/Task';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tylerauer',
  password: 'postgres',
  database: 'one-to-rule-them-all',
  synchronize: true,
  logging: true,
  entities: [Task],
};

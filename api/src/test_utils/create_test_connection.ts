import { createConnection } from 'typeorm';
import { entities } from '../entities';

export const createTestConnection = (drop: boolean = false) => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'tylerauer',
    password: 'postgres',
    database: 'test-one-to-rule-them-all',
    synchronize: drop,
    dropSchema: drop,
    entities: entities,
  });
};

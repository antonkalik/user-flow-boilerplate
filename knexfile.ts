require('dotenv').config();
require('ts-node/register');

import type { Knex } from 'knex';

const connection: Knex.ConnectionConfig = {
  host: process.env.DB_HOST!,
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
};

const commonConfig: Knex.Config = {
  client: 'pg',
  connection,
  migrations: {
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};

const config: Record<string, Knex.Config> = {
  development: {
    ...commonConfig,
  },
  test: {
    ...commonConfig,
    connection: {
      ...connection,
      database: process.env.DB_NAME_TEST!,
    },
  },
  production: {
    ...commonConfig,
    connection: {
      ...connection,
      ssl: { rejectUnauthorized: false },
    },
  },
};

export default config;

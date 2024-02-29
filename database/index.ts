import Knex from 'knex';
import configs from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === undefined) {
  console.warn('NODE_ENV is not set, defaulting to "development".');
}

export const database = Knex(configs[environment]);

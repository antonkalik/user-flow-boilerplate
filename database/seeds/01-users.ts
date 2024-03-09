require('dotenv').config();
import { Knex } from 'knex';
import * as process from 'process';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { Role, User } from '../../src/@types';

const tableName = 'users';
const testPassword = process.env.TEST_PASSWORD as string;
const testUserName = process.env.TEST_USERNAME as string;
const testEmail = process.env.TEST_EMAIL as string;

export async function seed(knex: Knex): Promise<void> {
  await knex(tableName).del();
  const users: Omit<User, 'id' | 'password' | 'created_at' | 'updated_at'>[] = [
    ...Array.from({ length: 10 }, (_, index) => index),
  ].map(index => ({
    email: faker.internet.email().toLowerCase(),
    username: faker.internet.userName().toLowerCase(),
    role: index % 3 ? Role.Blogger : Role.Admin,
  }));
  users.push({
    email: testEmail,
    username: testUserName,
    role: Role.Admin,
  });
  const hashed_password = await bcrypt.hash(testPassword, 10);
  await knex(tableName).insert(users.map(user => ({ ...user, password: hashed_password })));
}

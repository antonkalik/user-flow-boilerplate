require('dotenv').config({
  path: '../../.env',
});
import process from 'process';
import * as redis from 'redis';

const client = redis.createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.on('error', error => console.error('Redis Client Error', error));

const connect = async () => {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error(`Could not connect to Redis: ${err}`);
    process.exit(1);
  }
};

class Redis {
  public static setSession(userId: number, token: string) {
    if (!userId) throw new Error('userId is required');
    if (!token) throw new Error('token is required');
    try {
      return client.set(`session:${userId}`, token);
    } catch (error) {
      console.error(error);
    }
  }

  public static getSession(userId: number) {
    if (!userId) throw new Error('userId is required');
    return client.get(`session:${userId}`);
  }

  public static deleteSession(userId: string) {
    if (!userId) throw new Error('userId is required');
    try {
      return client.del(`session:${userId}`);
    } catch (error) {
      console.error(error);
    }
  }
}

export { client, connect, Redis };

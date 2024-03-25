import * as redis from 'redis';
import * as dotenv from 'dotenv';
import process from 'process';
import { RedisClientType } from 'redis';

dotenv.config();

export class RedisService {
  private static client: RedisClientType;

  public static async initialize() {
    if (!this.client) {
      try {
        this.client = redis.createClient({
          url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        });

        this.client.on('error', error => console.error('Redis Client Error', error));

        await this.client.connect();
        console.log('Connected to Redis');
      } catch (err) {
        console.error(`Could not connect to Redis: ${err}`);
        process.exit(1);
      }
    }
  }

  public static setSession(userId: number, token: string) {
    if (!userId) throw new Error('userId is required');
    if (!token) throw new Error('token is required');
    try {
      return this.client.set(`session:${userId}`, token);
    } catch (error) {
      console.error(error);
    }
  }

  public static getSession(userId: number) {
    if (!userId) throw new Error('userId is required');
    return this.client.get(`session:${userId}`);
  }

  public static deleteSession(userId: string) {
    if (!userId) throw new Error('userId is required');
    try {
      return this.client.del(`session:${userId}`);
    } catch (error) {
      console.error(error);
    }
  }
}

import * as dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export const getHost = (): string => {
  const isProduction = process.env.NODE_ENV === 'production';
  const protocol = isProduction ? 'https' : 'http';
  const port = isProduction ? '' : `:${process.env.CLIENT_PORT}`;
  return `${protocol}://${process.env.WEB_HOST}${port}`;
};

require('dotenv').config();
import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const jwt = {
  verify: <Result>(token: string): Promise<Result> => {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not found in environment variables!');
    }

    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded as Result);
        }
      });
    });
  },
  sign: (payload: string | object | Buffer): Promise<string> => {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not found in environment variables!');
    }

    return new Promise((resolve, reject) => {
      try {
        resolve(jsonwebtoken.sign(payload, JWT_SECRET));
      } catch (error) {
        reject(error);
      }
    });
  },
};

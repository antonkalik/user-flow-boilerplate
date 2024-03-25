import * as dotenv from 'dotenv';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';

dotenv.config();

export class TokenService {
  private static jwt_secret: string = process.env.JWT_SECRET!;

  static initialize = () => {
    if (!this.jwt_secret) {
      throw new Error('JWT secret not found in environment variables!');
    }
  };

  public static verify = <Result>(token: string): Promise<Result> =>
    new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, TokenService.jwt_secret, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded as Result);
        }
      });
    });

  public static sign = (
    payload: string | object | Buffer,
    options: SignOptions = {}
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      try {
        resolve(jsonwebtoken.sign(payload, TokenService.jwt_secret, options));
      } catch (error) {
        reject(error);
      }
    });
}

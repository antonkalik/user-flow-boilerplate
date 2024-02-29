import { jwt } from 'src/utils/jwt';
import { Redis } from 'src/redis';
import type { Request, Response, NextFunction } from 'express';
import type { UserSession } from 'src/@types';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) return res.sendStatus(401);

  if (!JWT_SECRET) {
    console.error('JWT_SECRET Not Found');
    return res.sendStatus(500);
  }

  if (!token) return res.status(401).json({ error: 'Token not provided' });

  try {
    const userSession = await jwt.verify<UserSession>(token);

    if (!userSession) {
      return res.sendStatus(401);
    }

    const storedToken = await Redis.getSession(userSession.id);

    if (!storedToken || storedToken !== token) {
      return res.sendStatus(401);
    }
    req.user = userSession;
    next();
  } catch (error) {
    console.error('JWT_ERROR', error);
    return res.sendStatus(401);
  }
}

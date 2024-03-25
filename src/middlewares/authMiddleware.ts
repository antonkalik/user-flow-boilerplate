import { RedisService } from 'src/services/RedisService';
import type { Request, Response, NextFunction } from 'express';
import type { UserSession } from 'src/@types';
import { TokenService } from 'src/services/TokenService';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) return res.sendStatus(401);

  if (!JWT_SECRET) {
    return res.sendStatus(500);
  }

  if (!token) return res.status(401).json({ error: 'Token not provided' });

  try {
    const userSession = await TokenService.verify<UserSession>(token);

    if (!userSession) {
      return res.sendStatus(401);
    }

    const storedToken = await RedisService.getSession(userSession.id);

    if (!storedToken || storedToken !== token) {
      return res.sendStatus(401);
    }
    req.user = userSession;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

import type { Request, Response } from 'express';
import { Redis } from 'src/redis';

export async function logoutController(req: Request, res: Response) {
  try {
    await Redis.deleteSession(req.user.id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

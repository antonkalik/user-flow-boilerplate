import type { Request, Response } from 'express';
import { RedisService } from 'src/services/RedisService';

export async function logoutController(req: Request, res: Response) {
  try {
    await RedisService.deleteSession(req.user.id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import type { User } from 'src/@types';

export const sessionController = async (req: Request, res: Response) => {
  if (!req.user) return res.sendStatus(401);

  try {
    const user = await UserModel.findOneById<User>(req.user.id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

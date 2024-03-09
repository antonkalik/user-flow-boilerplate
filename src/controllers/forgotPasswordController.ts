import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import type { User } from 'src/@types';

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const {
      email,
    }: {
      email: string;
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Invalid email' });
    }

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

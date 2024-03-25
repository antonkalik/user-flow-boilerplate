import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { TokenService } from 'src/services/TokenService';
import { UserModel } from 'src/models/UserModel';
import type { User } from 'src/@types';

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.sendStatus(400);
    }

    const userData = await TokenService.verify<{ id: number }>(token);
    const user = await UserModel.findOneById<User>(userData.id);

    if (!user) {
      return res.sendStatus(400);
    }

    const newPassword = req.body.password;

    if (!newPassword) {
      return res.sendStatus(400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.updateById(user.id, { password: hashedPassword, passwordResetToken: null });

    return res.sendStatus(200);
  } catch (error) {
    const errors = ['jwt malformed', 'TokenExpiredError', 'invalid token'];
    if (errors.includes(error.message)) {
      return res.sendStatus(400);
    }

    return res.sendStatus(500);
  }
};

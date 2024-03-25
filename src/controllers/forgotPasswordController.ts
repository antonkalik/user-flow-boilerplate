import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import type { User } from 'src/@types';
import { TokenService } from 'src/services/TokenService';
import { EmailService } from 'src/services/EmailService';

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const {
      email,
    }: {
      email: string;
    } = req.body;

    const user = await UserModel.findByEmail(email);

    if (user) {
      const token = await TokenService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: '1 day',
        }
      );
      await UserModel.createPasswordResetToken(user.id, token);
      await EmailService.sendPasswordResetEmail(email, token);
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import bcrypt from 'bcrypt';

export const updatePasswordController = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    if (!password) return res.sendStatus(400);
    const hashedPassword = (await bcrypt.hash(password, 10)) as string;
    const user = await UserModel.updateOneById(req.user.id, { password: hashedPassword });

    return res.status(200).json({ id: user.id });
  } catch (error) {
    return res.sendStatus(500);
  }
};

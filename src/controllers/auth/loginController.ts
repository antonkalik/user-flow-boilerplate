require('dotenv').config({
  path: '../../.env',
});
import { jwt } from 'src/utils/jwt';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import { Redis } from 'src/redis';

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  try {
    const user = await UserModel.findByEmail(email);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token: string = await jwt.sign({
        id: user.id,
      });

      await Redis.setSession(user.id, token);

      res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

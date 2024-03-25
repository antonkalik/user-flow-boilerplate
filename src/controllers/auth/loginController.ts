import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import { RedisService } from 'src/services/RedisService';
import { TokenService } from 'src/services/TokenService';

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

      const token: string = await TokenService.sign({
        id: user.id,
      });

      await RedisService.setSession(user.id, token);

      res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { validate } from 'src/helpers/validation/validate';
import { userSchema } from 'src/helpers/validation/schemas/userSchema';
import { UserModel } from 'src/models/UserModel';
import { RedisService } from 'src/services/RedisService';
import type { User } from 'src/@types';
import { getRandomString } from 'src/utils/getRandomString';
import { TokenService } from 'src/services/TokenService';

type Payload = Omit<User, 'id' | 'created_at' | 'updated_at' | 'role'>;

export async function signUpController(req: Request, res: Response) {
  const { email, password }: Payload = req.body;
  const validation = validate<Payload>(req.body, userSchema);

  if (!validation.isValid) {
    return res.status(400).send(`Invalid ${validation.invalidKey}`);
  }

  try {
    const user = await UserModel.findOneBy({ email });

    if (user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const hashedPassword = (await bcrypt.hash(password, 10));
    const username = `${email.split('@')[0]}${getRandomString(5)}`;
    const createdUser = await UserModel.create<Payload>({
      email,
      password: hashedPassword,
      username,
    });
    const token = await TokenService.sign({
      id: createdUser.id,
    });
    await RedisService.setSession(createdUser.id, token);

    res.status(200).json({
      token,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
}

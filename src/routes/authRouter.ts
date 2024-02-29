import { Router } from 'express';
import { signUpController } from 'src/controllers/auth/signUpController';
import { loginController } from 'src/controllers/auth/loginController';

export const authRouter = Router();

authRouter.post('/signup', signUpController);
authRouter.post('/login', loginController);

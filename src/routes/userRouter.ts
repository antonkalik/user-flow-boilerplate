import { Router } from 'express';
import { updateUserController } from 'src/controllers/user/updateUserController';
import { deleteUserController } from 'src/controllers/user/deleteUserController';
import { logoutController } from 'src/controllers/user/logoutController';
import { updatePasswordController } from 'src/controllers/user/updatePasswordController';

export const userRouter = Router();

userRouter.patch('/', updateUserController);
userRouter.delete('/', deleteUserController);
userRouter.post('/logout', logoutController);
userRouter.post('/update-password', updatePasswordController);

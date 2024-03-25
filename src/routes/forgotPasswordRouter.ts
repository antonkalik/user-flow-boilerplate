import { Router } from 'express';
import { forgotPasswordController } from 'src/controllers/forgotPasswordController';
import { resetPasswordController } from 'src/controllers/resetPasswordController';

export const forgotPasswordRouter = Router();

forgotPasswordRouter.post('/', forgotPasswordController);
forgotPasswordRouter.post('/reset/:token', resetPasswordController);

import { Router } from 'express';
import { authRouter } from 'src/routes/authRouter';
import { healthController } from 'src/controllers/healthController';
import { sessionController } from 'src/controllers/sessionController';
import { authMiddleware } from 'src/middlewares/authMiddleware';
import { userRouter } from 'src/routes/userRouter';
import { forgotPasswordController } from 'src/controllers/forgotPasswordController';

export const router = Router({ mergeParams: true });

router.get('/health', healthController);
router.get('/forgot-password', forgotPasswordController);
router.use('/auth', authRouter);
router.get('/session', authMiddleware, sessionController);
router.use('/user', authMiddleware, userRouter);

router.use((_, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

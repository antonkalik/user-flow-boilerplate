import { UserSession } from 'src/middlewares/authMiddleware';

export declare global {
  namespace NodeJS {
    namespace env {
      interface ProcessEnv extends IProcessEnv {}
    }
  }

  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}

interface IProcessEnv {
  JWT_SECRET: string;
  NODE_ENV: 'development' | 'production';
  PORT: number;
}

import { TokenService } from 'src/services/TokenService';
import { RedisService } from 'src/services/RedisService';
import { EmailService } from 'src/services/EmailService';

export const initialize = async () => {
  await RedisService.initialize();
  TokenService.initialize();
  EmailService.initialize();
};

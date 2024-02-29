import validator from 'validator';
import { ValidationSchema } from './types';

export const userSchema: ValidationSchema = {
  email: validator.isEmail,
  password: (str: string) => validator.isLength(str, { min: 6 }),
};

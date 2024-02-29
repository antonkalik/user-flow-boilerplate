import { ValidationSchema } from './schemas/types';

interface ValidationResult {
  isValid: boolean;
  invalidKey?: string;
}

export function validate<Data>(data: Data, schema: ValidationSchema): ValidationResult {
  for (let key in schema) {
    if (schema.hasOwnProperty(key)) {
      const validator = schema[key];
      const value = data[key];
      if (!validator(value)) {
        return { isValid: false, invalidKey: key };
      }
    }
  }
  return { isValid: true };
}

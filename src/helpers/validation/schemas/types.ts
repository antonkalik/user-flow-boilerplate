export type ValidatorFunction = (str: string) => boolean;

export interface ValidationSchema {
  [key: string]: ValidatorFunction;
}

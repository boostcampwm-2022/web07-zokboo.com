import CustomError from './CustomError';

export const createException = (status: number, msg: string, code?: string) => {
  return new CustomError(msg, status, code);
};

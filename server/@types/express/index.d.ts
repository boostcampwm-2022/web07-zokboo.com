import 'express';

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

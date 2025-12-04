import { Request } from 'express';
export type RequestBody<T> = Request<unknown, unknown, T>;
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        name?: string;
      };
    }
  }
}

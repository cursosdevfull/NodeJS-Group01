import { Request, Response, NextFunction } from 'express';
import Responses from '../utils/responses.util';

export interface IError extends Error {
  status?: number;
}

export default class ErrorHandler {
  // anonima(z: (req, res, next) => Promise)
  static catchAsync(
    ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      return ftn(req, res, next).catch((error) => {
        Responses.send(res, 500, error);
      });
    };
  }

  static notFound(req: Request, res: Response, next: NextFunction) {
    // Responses.send(res, 404, {});
    const error: IError = new Error('Route not found');
    error.status = 404;

    next(error);
  }

  static general(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (process.env.NODE_ENV !== 'development') {
      delete error.stack;
    }
    Responses.send(res, error.status, error);
  }
}

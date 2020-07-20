import { Response } from 'express';

export default class Responses {
  static send(res: Response, status: number, results: any | Array<any>) {
    res.status(status).json({
      status,
      results,
    });
  }
}

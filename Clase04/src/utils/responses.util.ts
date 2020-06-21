import { Response } from 'express';

export default class Responses {
  static send(res: Response, status: number, results: {} | Array<{}>) {
    res.status(status).json({
      status,
      results,
    });
  }
}

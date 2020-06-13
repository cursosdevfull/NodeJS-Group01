import { Response } from 'express';

export default class Responses {
  static send(res: Response, status: number, results: {} | Array<{}>) {
    switch (status) {
      case 200:
        res.status(status).json({
          status,
          results,
        });
        break;
      case 201:
        res.status(status).json({
          status,
          results,
        });
        break;
      case 404:
        res.status(status).json({
          status,
          results,
        });
        break;
      case 500:
        res.status(status).json({
          status,
          results,
        });
        break;
    }
  }
}

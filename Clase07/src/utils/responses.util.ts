import { Response } from 'express';

export default class Responses {
  static send(res: Response, status: number, data: any) {
    return res.status(status).json({ results: data });
  }

  static sendNotFound(res: Response, message: string = '') {
    return res.status(404).json({ message });
  }
}

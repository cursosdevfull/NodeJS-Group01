import { Application } from 'express';
import http from 'http';
import yenv from 'yenv';
import Message from '../utils/message.util';

const env = yenv();

export default class ServerService {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async initialize() {
    const promiseInitialize = new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(env.PORT)
        .on('listening', () => {
          Message.log(`Server is running on port ${env.PORT}`);
          resolve();
        })
        .on('error', (error) => {
          Message.log('An error ocurred');
          reject(error);
        });
    });

    await promiseInitialize;
  }
}

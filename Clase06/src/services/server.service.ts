import { Application } from 'express';
import { MessageLog } from '../utils/message-log.util';
import http from 'http';
import yenv from 'yenv';

const env = yenv();

export class ServerService {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async initialize() {
    const promiseConnection = new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(env.PORT)
        .on('listening', () => {
          MessageLog.log(`Server is running on port ${env.PORT}`);
          resolve();
        })
        .on('error', (error) => {
          MessageLog.log('An error ocurred while begin the server');
          reject(error);
        });
    });

    await promiseConnection;
  }
}

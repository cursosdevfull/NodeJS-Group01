import http from 'http';
import { Application } from 'express';
import yenv from 'yenv';
import Message from '../utils/message.util';

const env = yenv();

const initializeServer = async (app: Application) => {
  const promiseServer = new Promise((resolve, reject) => {
    const server = http.createServer(app);

    server
      .listen(env.PORT)
      .on('listening', () => {
        Message.log(`Server is running on port ${env.PORT}`);
        resolve();
      })
      .on('error', (error) => {
        Message.log('An error ocurred on connection to server');
        reject(error);
      });
  });

  await promiseServer;
};

export default initializeServer;

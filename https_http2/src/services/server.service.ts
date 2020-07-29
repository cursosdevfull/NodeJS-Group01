import { Application } from 'express';
import Message from '../utils/message.util';
import fs from 'fs';
import yenv from 'yenv';
import spdy from 'spdy';

const env = yenv();

const initializeServer = async (app: Application) => {
  const promiseServer = new Promise((resolve, reject) => {
    const server = spdy.createServer(
      {
        key: fs.readFileSync(__dirname + '/key.pem'),
        cert: fs.readFileSync(__dirname + '/cert.pem'),
        passphrase: '3lquijote',
      },
      app
    );

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

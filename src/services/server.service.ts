import http from 'http';
import { Application } from 'express';
import yenv from 'yenv';

const env = yenv();

const initializeServer = async (app: Application) => {
  const startServer = new Promise((resolve, reject) => {
    const server: http.Server = http.createServer(app);
    server
      .listen(env.PORT)
      .on('listening', () => {
        console.log(`Server is running on port ${env.PORT}`);
        resolve();
      })
      .on('error', (err) => {
        console.log('An error ocurred in server');
        reject(err);
      });
  });

  await startServer;
};

export default initializeServer;

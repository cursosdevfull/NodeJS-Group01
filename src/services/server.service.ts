import http from 'http';
import { Application } from 'express';

const initializeServer = async (app: Application) => {
  const startServer = new Promise((resolve, reject) => {
    const server: http.Server = http.createServer(app);
    server
      .listen(3000)
      .on('listening', () => {
        console.log('Server is running on port 3000');
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

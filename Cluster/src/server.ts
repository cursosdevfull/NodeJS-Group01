import getApp from './app';
import initializeServer from './services/server.service';
import initializeDatabase from './services/database.service';

import cluster from 'cluster';
import os from 'os';
import Message from './utils/message.util';

const workers: cluster.Worker[] = [];
let countRequests = 0;

const start = async () => {
  try {
    if (cluster.isMaster) {
      const receiveMessage = (message: any) => {
        console.log(message);
        countRequests++;

        setTimeout(() => {
          for (let worker of workers) {
            worker.send(countRequests);
          }
        }, 3000);
      };

      const quantityCPUs = os.cpus().length / 2;
      Message.log(`Master cluster setting up ${quantityCPUs} workers`);

      for (let index = 0; index < quantityCPUs; index++) {
        workers.push(cluster.fork());

        workers[index].on('message', receiveMessage);
      }

      cluster.on('online', (worker) => {
        Message.log(`Worker ${worker.process.pid} is online and listening`);
      });

      cluster.on('exit', (worker, code, signal) => {
        Message.log(
          `Worker ${worker.process.pid} dead with code ${code} and signal ${signal}`
        );

        const indexToDelete = workers.findIndex(
          (wk) => wk.process.pid === worker.process.pid
        );

        workers.splice(indexToDelete);

        Message.log('Beginnig a new worker');
        workers.push(cluster.fork());

        workers[workers.length - 1].on('message', receiveMessage);
      });
    } else {
      await initializeServer(getApp());
      await initializeDatabase();
    }
  } catch (error) {
    console.log(`An exception ocurred: ${error}`);
    process.exit(1);
  }
};

start();

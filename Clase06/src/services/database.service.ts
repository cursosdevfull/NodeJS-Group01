import { createConnection, Connection } from 'typeorm';
import { MessageLog } from '../utils/message-log.util';
import yenv from 'yenv';

const env = yenv();

export class DatabaseService {
  private client: Connection;

  async initialize() {
    const promiseInitialize = new Promise((resolve, reject) => {
      const parametersConnection = {
        type: env.DATABASE.TYPE,
        host: env.DATABASE.HOST,
        username: env.DATABASE.USERNAME,
        password: env.DATABASE.PASSWORD,
        database: env.DATABASE.NAME,
        port: env.DATABASE.PORT,
        entities: [env.DATABASE.ENTITIES],
        synchronize: env.DATABASE.SYNCHRONIZE,
      };

      createConnection(parametersConnection)
        .then((connection) => {
          MessageLog.log('Connected to database');
          this.client = connection;
          resolve();
        })
        .catch((error) => {
          MessageLog.log('Error while connecting to database');
          reject(error);
        });
    });

    await promiseInitialize;
  }

  closeConnection() {
    if (this.client) {
      this.client.close();
    }
  }
}

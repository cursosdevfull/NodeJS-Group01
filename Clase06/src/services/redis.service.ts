import IORedis from 'ioredis';
import { MessageLog } from '../utils/message-log.util';

let clientConnection: any;

const getConnection = () => {
  return clientConnection;
};

const clearRedis = async () => {
  const keys = await clientConnection.keys('APP_*');
  const pipeline = clientConnection.pipeline();

  keys.forEach((key: any) => {
    pipeline.del(key);
  });

  return pipeline.exec();
};

const getRedis = async (key: string) => {
  return await clientConnection.get(key);
};

const setRedis = async (key: string, value: any) => {
  await clientConnection.set(key, value);
  await clientConnection.client.expire(key, 24 * 60 * 60 * 1000);
};

export { getConnection, clearRedis, getRedis, setRedis };

export default class RedisService {
  private client: IORedis.Redis;

  async initialize() {
    const promiseInitialize = new Promise((resolve, reject) => {
      this.client = new IORedis({
        host: '127.0.0.1',
        port: 6379,
        password: 'todovale',
        retryStrategy(times) {
          const delay = Math.min(times * 100, 2000);
          return delay;
        },
        maxRetriesPerRequest: 5,
      });

      this.client
        .on('connect', () => {
          MessageLog.log('Connected to Redis');
          resolve();
        })
        .on('error', (error: any) => {
          MessageLog.log('An error ocurred: ' + JSON.stringify(error));
          reject(error);
        });

      clientConnection = this.client;
    });

    await promiseInitialize;
  }

  disconnect() {
    this.client.disconnect();
  }
}

import { ServerService } from './services/server.service';
import { MessageLog } from './utils/message-log.util';
import { DatabaseService } from './services/database.service';

import app from './app';

import 'reflect-metadata';

const start = async () => {
  const serverService: ServerService = new ServerService(app);
  const databaseService: DatabaseService = new DatabaseService();
  try {
    await serverService.initialize();
    await databaseService.initialize();
  } catch (error) {
    MessageLog.log(JSON.stringify(error));
    databaseService.closeConnection();
    process.exit(1);
  }
};

start();

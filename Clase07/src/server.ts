import SequelizeService from './services/sequelize.service';
import ServerService from './services/server.service';

import app from './app';
import Message from './utils/message.util';
import { closeConnection } from './services/sequelize.service';

import 'reflect-metadata';

const start = async () => {
  const sequelizeService = new SequelizeService();

  try {
    await sequelizeService.initialize();
    const serverService = new ServerService(app);
    await serverService.initialize();
  } catch (error) {
    Message.log(`Error: ${JSON.stringify(error)}`);
    closeConnection();
    process.exit(1);
  }
};

start();

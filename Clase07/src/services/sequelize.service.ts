import { Sequelize } from 'sequelize-typescript';
import yenv from 'yenv';
import Message from '../utils/message.util';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';

const env = yenv();

let database: Sequelize;

export default class SequelizeService {
  constructor() {
    database = new Sequelize({
      database: env.DATABASE.NAME,
      host: env.DATABASE.HOST,
      username: env.DATABASE.USERNAME,
      password: env.DATABASE.PASSWORD,
      dialect: env.DATABASE.DIALECT,
      logging: env.DATABASE.LOGGING,
      models: [User, Task],
    });
  }

  async initialize() {
    await database.sync({ force: env.DATABASE.FORCE });
    Message.log('Sequelize is running');
  }
}

export const getConnection = (): Sequelize => {
  return database;
};

export const closeConnection = () => {
  database!.close();
  /*   if (database) {
    database.close()
  } */
};

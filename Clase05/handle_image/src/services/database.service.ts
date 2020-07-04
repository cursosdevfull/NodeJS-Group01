import mongoose from 'mongoose';
import yenv from 'yenv';
import Message from '../utils/message.util';

const env = yenv();

const initializeDatabase = async () => {
  const promiseDatabase = new Promise((resolve, reject) => {
    /*     const connectionString = `mongodb+srv://${env.URL.MONGODB.USER}:${env.URL.MONGODB.PASS}@${env.URL.MONGODB.HOST}/${env.URL.MONGODB.DB}?retryWrites=true&w=majority`; */

    const connectionString = `mongodb://${env.URL.MONGODB.USER}:${env.URL.MONGODB.PASS}@${env.URL.MONGODB.HOST}:27017/${env.URL.MONGODB.DB}?authSource=admin`;

    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      poolSize: 10,
    };

    const callback = (error: any) => {
      if (error) {
        Message.log('An error ocurred in connection to MongoDB');
        reject(error);
      } else {
        Message.log('Server is connected to MongoDB');
        resolve();
      }
    };

    mongoose.connect(connectionString, options, callback);
  });

  await promiseDatabase;
};

export default initializeDatabase;

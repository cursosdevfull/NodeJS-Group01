import mongoose from 'mongoose';
import yenv from 'yenv';

const env = yenv();

const initializeDatabase = async () => {
  const startConnection = new Promise((resolve, reject) => {
    mongoose.connect(
      `mongodb+srv://${env.URL.MONGODB.USER}:${env.URL.MONGODB.PASS}@${env.URL.MONGODB.HOST}/${env.URL.MONGODB.DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        poolSize: 10,
      },
      (err) => {
        if (err) {
          console.log('An error ocurred in connection to MongoDB');
          reject(err);
        } else {
          console.log('Connect to MongoDB');
          resolve();
        }
      }
    );
  });

  await startConnection;
};

export default initializeDatabase;

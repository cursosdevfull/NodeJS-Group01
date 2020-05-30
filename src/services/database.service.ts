import mongoose from 'mongoose';

const initializeDatabase = async () => {
  const startConnection = new Promise((resolve, reject) => {
    mongoose.connect(
      'mongodb+srv://user-cursonode:cVWPOH5SDiXxQE75@cursonode-01ufq.mongodb.net/test?retryWrites=true&w=majority',
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

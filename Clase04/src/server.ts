import app from './app';
import initializeServer from './services/server.service';
import initializeDatabase from './services/database.service';

const start = async () => {
  try {
    await initializeServer(app);
    await initializeDatabase();
  } catch (error) {
    console.log(`An exception ocurred: ${error}`);
    process.exit(1);
  }
};

start();

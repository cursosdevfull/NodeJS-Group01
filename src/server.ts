import express, { Request, Response } from 'express';
import routerProduct from './routes/product.route';
import initializeServer from './services/server.service';
import initializeDatabase from './services/database.service';
import { RolRouter } from './routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/product', routerProduct);
app.use('/rol', RolRouter);

const start = async () => {
  try {
    await initializeServer(app);
    await initializeDatabase();
  } catch (error) {
    console.log('Initial error', error);
  }
};

start();

/* const app = express();

app.use('/', router);
app.use('/product', routerProduct);

app.use((req, res) => {
  console.log('Route not found');
  res.send('No encontrado');
});

app.listen(3000, (req: Request, res: Response) => {
  console.log('Server is running');
});
 */

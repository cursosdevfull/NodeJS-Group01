import express, { Request, Response } from 'express';
import router from './routes/default.route';
import routerProduct from './routes/product.route';

const app = express();

app.use('/', router);
app.use('/product', routerProduct);

app.use((req, res) => {
  console.log('Route not found');
  res.send('No encontrado');
});

app.listen(3000, (req: Request, res: Response) => {
  console.log('Server is running');
});

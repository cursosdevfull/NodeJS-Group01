import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  console.log('Route main');
  res.send('Hola');
});

app.get('/product', (req: Request, res: Response) => {
  const productList = [
    { product: 'Product 01' },
    { product: 'Product 01' },
    { product: 'Product 01' },
    { product: 'Product 01' },
    { product: 'Product 01' },
  ];
  res.json(productList);
});

app.use((req, res) => {
  console.log('Route not found');
  res.send('No encontrado');
});

app.listen(3000, (req: Request, res: Response) => {
  console.log('Server is running');
});

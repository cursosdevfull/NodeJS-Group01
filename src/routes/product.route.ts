import express, { Request, Response, NextFunction } from 'express';

const routerProduct = express.Router();

routerProduct.get('/', (req: Request, res: Response) => {
  res.json({ product: 'Product 02' });
});

routerProduct.get('/list', (req: Request, res: Response) => {
  const productList = [
    { product: 'Product 01' },
    { product: 'Product 01' },
    { product: 'Product 01' },
    { product: 'Product 01' },
    { product: 'Product 01' },
  ];
  res.json(productList);
});

export default routerProduct;

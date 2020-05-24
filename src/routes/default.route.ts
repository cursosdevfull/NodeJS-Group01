import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log('Route main');
  res.send('Hola');
});

export default router;

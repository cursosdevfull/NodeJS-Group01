import express from 'express';
import { router as RoleRouter } from './routes/role.route';
import { router as UserRouter } from './routes/user.route';
import { router as AuthRouter } from './routes/auth.route';
import ErrorHandler from './handlers/error.handler';
import { Application, Request, Response } from 'express';
import Message from './utils/message.util';

const getApp = (): Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/role', RoleRouter);
  app.use('/user', UserRouter);
  app.use('/auth', AuthRouter);

  app.get('/greeting', (req: Request, res: Response) => {
    process.send({ status: 'notification' });
    res.send(`Greeting form process ${process.pid}`);
  });

  app.use(ErrorHandler.notFound);
  app.use(ErrorHandler.general);

  process.on('message', (requests) => {
    Message.log(`Quantity request send by worker ${process.pid}: ${requests}`);
  });

  return app;
};

export default getApp;

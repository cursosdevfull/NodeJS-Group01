import express from 'express';
import { router as RoleRouter } from './routes/role.route';
import { router as UserRouter } from './routes/user.route';
import { router as AuthRouter } from './routes/auth.route';
import ErrorHandler from './handlers/error.handler';
import { Request, Response } from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Ok');
});

app.use('/role', RoleRouter);
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);

app.use(ErrorHandler.notFound);

app.use(ErrorHandler.general);

export default app;

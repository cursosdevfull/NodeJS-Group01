import express from 'express';
import { router as RoleRouter } from './routes/role.route';
import { router as UserRouter } from './routes/user.route';
import ErrorHandler from './handlers/error.handler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/role', RoleRouter);
app.use('/user', UserRouter);

app.use(ErrorHandler.notFound);

app.use(ErrorHandler.general);

export default app;

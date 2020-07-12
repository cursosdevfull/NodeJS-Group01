import express, { Request, Response } from 'express';
import attachRoutes from './utils/attach-route.util';
import UserController from './controllers/user.controller';
import { PhotoController } from '../../Clase05/typeorm/src/controllers/photo.controller';
import UserRepository from './repositories/user.repository';
import TaskController from './controllers/task.controller';
import TaskRepository from './repositories/task.repository';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Home');
});

attachRoutes(app, [
  { class: UserController, dependencies: [UserRepository] },
  { class: TaskController, dependencies: [TaskRepository] },
]);

export default app;

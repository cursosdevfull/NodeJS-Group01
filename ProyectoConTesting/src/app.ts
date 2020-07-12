import express, { Application, Request, Response } from 'express';
import { UserController } from './controllers/user.controller';
import attachRoutes from './utils/attach-routes.util';
import { PhotoController } from './controllers/photo.controller';
import { UserRepository } from './repositories/user.repository';
import { PhotoRepository } from './repositories/photo.repository';
import { DefaultController } from './controllers/default.controller';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Inicio');
});

attachRoutes(app, [
  { class: UserController, dependencies: [UserRepository] },
  { class: PhotoController, dependencies: [PhotoRepository] },
  { class: DefaultController, dependencies: [] },
]);

export default app;

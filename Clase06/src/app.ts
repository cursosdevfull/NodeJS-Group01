import express, { Application } from 'express';
import attachRoutes from './utils/attach-routes.util';
import { UserController } from './controllers/user.controller';
import { PhotoController } from './controllers/photo.controller';
import { DefaultController } from './controllers/default.controller';
import { PhotoRepository } from './repositories/photo.repository';
import { UserRepository } from './repositories/user.repository';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachRoutes(app, [
  { class: UserController, dependencies: [UserRepository] },
  { class: PhotoController, dependencies: [PhotoRepository] },
  { class: DefaultController, dependencies: [] },
]);

export default app;

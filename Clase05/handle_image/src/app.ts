import express, { Request, Response, NextFunction } from 'express';
import { router as RoleRouter } from './routes/role.route';
import { router as UserRouter } from './routes/user.route';
import { router as AuthRouter } from './routes/auth.route';
import ErrorHandler from './handlers/error.handler';
import * as fs from 'fs';
import * as path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/image', express.static('./public'));
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.startsWith('/avatar')) {
    fs.exists(path.join(__dirname, '../', '/public', req.url), (exists) => {
      console.log(path.join(__dirname, '../', '/public', req.url));
      if (exists) {
        res.download(
          path.join(__dirname, '../', '/public', req.url),
          'imagen.png'
        );
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

app.use('/role', RoleRouter);
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);

app.use(ErrorHandler.notFound);

app.use(ErrorHandler.general);

export default app;

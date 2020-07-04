import { Router } from 'express';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthController } from '../controllers/auth.controller';
import ErrorHandler from '../handlers/error.handler';

const router = Router();
const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

router.post('/login', ErrorHandler.catchAsync(authController.login));
router.post(
  '/generate-new-access-token',
  ErrorHandler.catchAsync(authController.newAccessToken)
);

export { router };

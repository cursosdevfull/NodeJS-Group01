import { Router } from 'express';
import UserRepository from '../repositories/user.repository';
import UserController from '../controllers/user.controller';
import ErrorHandler from '../handlers/error.handler';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { SchemaValidator } from '../validators/schema.validator';
import { userSchemas } from '../validators/user.schemas';
import { FileHandler } from '../handlers/file.handler';

const router = Router();
const userRepository: UserRepository = new UserRepository();
const userController: UserController = new UserController(userRepository);

router.get(
  '/',
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate('ADMIN', 'SUPERADMIN', 'OPERATOR'),
  ErrorHandler.catchAsync(userController.getAll)
);
router.get('/:_id', ErrorHandler.catchAsync(userController.getById));
router.post(
  '/',
  // FileHandler.uploadDisk('photo'),
  FileHandler.uploadMemory('photo'),
  FileHandler.resize('photo', 200),
  ErrorHandler.catchAsync(userController.insert)
);
router.put(
  '/:_id',
  SchemaValidator.canValidate(userSchemas.UPDATE),
  ErrorHandler.catchAsync(userController.update)
);
router.delete('/:_id', ErrorHandler.catchAsync(userController.delete));

export { router };

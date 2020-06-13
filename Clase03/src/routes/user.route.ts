import { Router } from 'express';
import UserRepository from '../repositories/user.repository';
import UserController from '../controllers/user.controller';
import ErrorHandler from '../handlers/error.handler';

const router = Router();
const userRepository: UserRepository = new UserRepository();
const userController: UserController = new UserController(userRepository);

router.get('/', ErrorHandler.catchAsync(userController.getAll));
router.get('/:_id', ErrorHandler.catchAsync(userController.getById));
router.post('/', ErrorHandler.catchAsync(userController.insert));
router.put('/:_id', ErrorHandler.catchAsync(userController.update));
router.delete('/:_id', ErrorHandler.catchAsync(userController.delete));

export { router };

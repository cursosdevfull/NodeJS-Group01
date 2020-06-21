import { Router } from 'express';
import RoleController from '../controllers/role.controller';
import RoleRepository from '../repositories/role.repository';
import ErrorHandler from '../handlers/error.handler';

const router = Router();

const roleRepository: RoleRepository = new RoleRepository();
const roleController: RoleController = new RoleController(roleRepository);

router.get('/', ErrorHandler.catchAsync(roleController.getAll));
router.get('/:_id', ErrorHandler.catchAsync(roleController.getById));
router.post('/', ErrorHandler.catchAsync(roleController.insert));
router.put('/:_id', ErrorHandler.catchAsync(roleController.update));
router.delete('/:_id', ErrorHandler.catchAsync(roleController.delete));

export { router };

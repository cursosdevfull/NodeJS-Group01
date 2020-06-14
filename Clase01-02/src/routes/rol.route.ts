import express from 'express';
import { RolController } from '../controllers';
import { RolRepository } from '../repositories';

const router = express.Router();
const repository = new RolRepository();
const controller = new RolController(repository);

router.post('/', controller.insertRole);
router.get('/', controller.getAllRoles);
router.get('/:_id', controller.getRolById);
router.put('/:_id', controller.updateRole);
router.delete('/:_id', controller.deleteRole);

export default router;

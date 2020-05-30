import express, { Router } from 'express';
import { RolController } from '../controllers';
import { RolRepository } from '../repositories';

const router = express.Router();
const repository = new RolRepository();
const controller = new RolController(repository);

router.post('/', controller.insertRole);

export default router;

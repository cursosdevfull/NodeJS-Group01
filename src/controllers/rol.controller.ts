import { RolRepository } from 'src/repositories';
import { Request, Response } from 'express';

export default class RolController {
  repository: RolRepository;

  constructor(repository: RolRepository) {
    this.repository = repository;
  }

  async insertRole(req: Request, res: Response) {
    const rolCreated = await this.repository.insertRole(req.body);

    res.json(rolCreated);
  }
}

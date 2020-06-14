import { RolRepository } from '../repositories';
import { Request, Response } from 'express';
import { IRol } from '../models/rol.model';

export default class RolController {
  repository: RolRepository;

  constructor(repository: RolRepository) {
    this.repository = repository;
    this.getAllRoles = this.getAllRoles.bind(this);
    this.insertRole = this.insertRole.bind(this);
    this.getRolById = this.getRolById.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
  }

  async insertRole(req: Request, res: Response) {
    const rolCreated = await this.repository.insertRole(req.body);

    res.json(rolCreated);
  }

  async getAllRoles(req: Request, res: Response) {
    const roles = await this.repository.getRoles();

    res.json(roles);
  }

  async getRolById(req: Request, res: Response) {
    const _id = req.params._id;
    const role = await this.repository.getRoleById(_id);

    res.json(role);
  }

  async updateRole(req: Request, res: Response) {
    const _id = req.params._id;
    const role: IRol = req.body;
    const roleUpdated = await this.repository.updateRole(_id, role);

    res.json(roleUpdated);
  }

  async deleteRole(req: Request, res: Response) {
    const _id = req.params._id;
    const roleDeleted = await this.repository.deleteRole(_id);

    res.json(roleDeleted);
  }
}

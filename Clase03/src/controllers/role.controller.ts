import RoleRepository from '../repositories/role.repository';
import { Request, Response } from 'express';
import { IRoleDocument } from '../models/role.model';
import Responses from '../utils/responses.util';

export default class RoleController {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const roles: IRoleDocument[] = await this.roleRepository.getAll();
    if (roles.length) {
      return Responses.send(res, 200, roles);
    }
    Responses.send(res, 404, {});
  }

  async getById(req: Request, res: Response) {
    const role: IRoleDocument = await this.roleRepository.getById(
      req.params._id
    );
    if (role) {
      return Responses.send(res, 200, role);
    }
    Responses.send(res, 404, {});
  }

  async insert(req: Request, res: Response) {
    const role: IRoleDocument = await this.roleRepository.insert(req.body);
    Responses.send(res, 201, role);
  }

  async update(req: Request, res: Response) {
    const role: IRoleDocument = await this.roleRepository.update(
      req.params._id,
      req.body
    );
    if (role) {
      return Responses.send(res, 201, role);
    }
    Responses.send(res, 404, {});
  }

  async delete(req: Request, res: Response) {
    const role: IRoleDocument = await this.roleRepository.delete(
      req.params._id
    );
    if (role) {
      return Responses.send(res, 201, role);
    }
    Responses.send(res, 404, {});
  }
}

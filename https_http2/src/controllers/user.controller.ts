import UserRepository from '../repositories/user.repository';
import Responses from '../utils/responses.util';
import { Request, Response } from 'express';
import { TokenService } from '../services/token.service';

export default class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const users = await this.userRepository.getAll();
    if (users.length) {
      return Responses.send(res, 200, users);
    }
    Responses.send(res, 404, {});
  }

  async getById(req: Request, res: Response) {
    const user = await this.userRepository.getById(req.params._id);
    if (user) {
      return Responses.send(res, 200, user);
    }
    Responses.send(res, 404, {});
  }

  async insert(req: Request, res: Response) {
    const refreshToken = TokenService.generateRefreshToken();
    const user = await this.userRepository.insert(req.body, refreshToken);
    if (user) {
      return Responses.send(res, 201, user);
    }
    Responses.send(res, 404, {});
  }

  async update(req: Request, res: Response) {
    const user = await this.userRepository.update(req.params._id, req.body);
    if (user) {
      return Responses.send(res, 201, user);
    }
    Responses.send(res, 404, {});
  }

  async delete(req: Request, res: Response) {
    const user = await this.userRepository.delete(req.params._id);
    if (user) {
      return Responses.send(res, 201, user);
    }
    Responses.send(res, 404, {});
  }
}

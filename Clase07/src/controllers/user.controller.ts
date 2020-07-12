import { Controller } from '../decorators/controller.decorator';
import { Get } from '../decorators/get.decorator';
import UserRepository from '../repositories/user.repository';
import Responses from '../utils/responses.util';
import { Request, Response } from 'express';
import { Post } from '../decorators/post.decorator';
import { Put } from '../decorators/put.decorator';
import { Delete } from '../decorators/delete.decorator';

@Controller('/user')
export default class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  @Get('/')
  async list(req: Request, res: Response) {
    const users = await this.userRepository.list();

    if (users) {
      Responses.send(res, 200, users);
    } else {
      Responses.sendNotFound(res, 'Not found');
    }
  }

  @Post('/')
  async insert(req: Request, res: Response) {
    const userInserted = await this.userRepository.insert(req.body);

    if (userInserted) {
      Responses.send(res, 201, userInserted);
    } else {
    }
  }

  @Put('/:id')
  async update(req: Request, res: Response) {
    const result = await this.userRepository.update(+req.params.id, req.body);

    if (result[0] === 1) {
      Responses.send(res, 201, 'User updated');
    } else {
      Responses.sendNotFound(res, 'User updated');
    }
  }

  @Delete('/:id')
  async delete(req: Request, res: Response) {
    const result = await this.userRepository.delete(+req.params.id);

    if (result[0] === 1) {
      Responses.send(res, 201, 'User updated');
    } else {
      Responses.sendNotFound(res, 'User updated');
    }
  }
}

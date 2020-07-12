import { Controller } from '../decorators/controller.decorator';
import { Request, Response } from 'express';
import { Get } from '../decorators/get.decorator';
import { UserRepository } from '../repositories/user.repository';
import { Post } from '../decorators/post.decorator';
import { Put } from '../decorators/put.decorator';
import { Delete } from '../decorators/delete.decorator';

@Controller('/user')
export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.list = this.list.bind(this);
    this.insert = this.insert.bind(this);
  }

  @Get('/')
  async list(req: Request, res: Response) {
    const users = await this.userRepository.list();
    res.json(users);
  }

  @Post('/')
  async insert(req: Request, res: Response) {
    const user = req.body;
    const userInserted = await this.userRepository.insert(user);
    res.json(userInserted);
  }

  @Put('/:id')
  async update(req: Request, res: Response) {
    const user = req.body;
    const id = +req.params.id;

    const userUpdated = await this.userRepository.update(id, user);

    res.json(userUpdated);
  }

  @Delete('/:id')
  async delete(req: Request, res: Response) {
    const id = +req.params.id;

    const userDeleted = await this.userRepository.delete(id);

    res.json(userDeleted);
  }
}

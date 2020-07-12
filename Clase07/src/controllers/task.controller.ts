import TaskRepository from '../repositories/task.repository';
import { Request, Response } from 'express';
import Responses from '../utils/responses.util';
import { Controller } from '../decorators/controller.decorator';
import { Get } from '../decorators/get.decorator';
import { Post } from '../decorators/post.decorator';
import { Put } from '../decorators/put.decorator';
import { Delete } from '../decorators/delete.decorator';

@Controller('/task')
export default class TaskController {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  @Get('/')
  async list(req: Request, res: Response) {
    const tasks = await this.taskRepository.list();

    if (tasks) {
      Responses.send(res, 200, tasks);
    } else {
      Responses.sendNotFound(res, 'Not found');
    }
  }

  @Post('/')
  async insert(req: Request, res: Response) {
    const taskInserted = await this.taskRepository.insert(req.body);

    if (taskInserted) {
      Responses.send(res, 201, taskInserted);
    } else {
      Responses.sendNotFound(res);
    }
  }

  @Put('/:id')
  async update(req: Request, res: Response) {
    const status = await this.taskRepository.update(+req.params.id, req.body);

    if (status) {
      Responses.send(res, 201, 'Task updated');
    } else {
      Responses.sendNotFound(res);
    }
  }

  @Delete('/:id')
  async delete(req: Request, res: Response) {
    const status = await this.taskRepository.delete(+req.params.id);

    if (status) {
      Responses.send(res, 201, 'Task deleted');
    } else {
      Responses.sendNotFound(res);
    }
  }
}

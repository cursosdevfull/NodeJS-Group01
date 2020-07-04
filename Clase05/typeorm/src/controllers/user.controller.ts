import { Controller } from '../decorators/controller.decorator';
import { Request, Response } from 'express';
import { Get } from '../decorators/get.decorator';

@Controller('/user')
export class UserController {
  constructor() {
    this.listado = this.listado.bind(this);
  }

  @Get('/')
  listado(req: Request, res: Response) {
    res.send('Hola');
  }
}

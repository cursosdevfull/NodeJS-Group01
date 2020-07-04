import { Request, Response } from 'express';
import { Controller } from '../decorators/controller.decorator';
import { Get } from '../decorators/get.decorator';

@Controller('/photo')
export class PhotoController {
  @Get('/')
  list(req: Request, res: Response) {
    res.send('List of photos');
  }
}

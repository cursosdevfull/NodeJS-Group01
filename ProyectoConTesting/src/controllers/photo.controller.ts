import { Controller } from '../decorators/controller.decorator';
import { Get } from '../decorators/get.decorator';
import { Request, Response } from 'express';
import { PhotoRepository } from '../repositories/photo.repository';
import { Post } from '../decorators/post.decorator';
import { Delete } from '../decorators/delete.decorator';
import { Put } from '../decorators/put.decorator';

@Controller('/photo')
export class PhotoController {
  private photoRepository: PhotoRepository;

  constructor(photoRepository: PhotoRepository) {
    this.photoRepository = photoRepository;

    this.list = this.list.bind(this);
  }

  @Get('/:id')
  async list(req: Request, res: Response) {
    const photos = await this.photoRepository.list(+req.params.id);

    res.json(photos);
  }

  @Post('/:id')
  async insert(req: Request, res: Response) {
    const photo = await this.photoRepository.insert(+req.params.id, req.body);

    res.json(photo);
  }

  @Delete('/:id')
  async delete(req: Request, res: Response) {
    const photo = await this.photoRepository.delete(+req.params.id);

    res.json(photo);
  }

  @Put('/:id')
  async update(req: Request, res: Response) {
    const photo = await this.photoRepository.update(+req.params.id, req.body);

    res.json(photo);
  }
}

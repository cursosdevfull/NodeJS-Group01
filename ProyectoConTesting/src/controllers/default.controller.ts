import { clearRedis } from '../services/redis.service';
import { Controller } from '../decorators/controller.decorator';
import { Get } from '../decorators/get.decorator';
import { Request, Response } from 'express';

@Controller('/clear')
export class DefaultController {
  @Get('/')
  async clearCacheRedis(req: Request, res: Response) {
    await clearRedis();
    res.send('Redis Caché has been invalidated');
  }
}

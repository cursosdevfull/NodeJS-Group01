import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import * as jimp from 'jimp';

export class FileHandler {
  static uploadDisk(field: string) {
    const optionalStorage = {
      destination(req: any, file: any, cb: any) {
        cb(null, './public/avatar');
      },
      filename(req: any, file: any, cb: any) {
        req.body[field] = file.originalname;
        cb(null, file.originalname);
      },
    };

    const options = {
      storage: multer.diskStorage(optionalStorage),
    };

    return multer(options).single(field);
  }

  static uploadMemory(field: string) {
    const options = {
      storage: multer.memoryStorage(),
      fileFilter: (req: any, file: any, cb: any) => {
        const isPhoto = file.mimetype.startsWith('image/');

        if (isPhoto) {
          return cb(null, true);
        } else {
          const error = new Error("It's not an image");
          cb.next(error, true);
        }
      },
    };

    return multer(options).single(field);
  }

  static resize(field: string, width: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) return next();

      const extension = req.file.mimetype.split('/')[1]; // image/png
      const newFileName = Date.now();
      const newFile = `${newFileName}.${extension}`;

      req.body[field] = newFile;

      const photo = await jimp.read(req.file.buffer);
      await photo.resize(width, jimp.AUTO);
      await photo.write(`./public/avatar/${newFile}`);

      next();
    };
  }
}

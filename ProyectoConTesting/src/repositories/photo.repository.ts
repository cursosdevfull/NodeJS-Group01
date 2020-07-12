import { getRepository, Repository } from 'typeorm';
import { Photo, PhotoEntity } from '../entities/photo.entity';
import { UserEntity, User } from '../entities/user.entity';
export class PhotoRepository {
  async list(idUser: number) {
    const repositoryPhotos = getRepository('photo');
    const photos = await repositoryPhotos.find({ user: idUser });

    return photos;
  }

  async insert(idUser: number, photo: Photo) {
    const repositoryPhoto = getRepository('photo');
    const repositoryUser: Repository<UserEntity> = getRepository('user');

    const photoInserted = new PhotoEntity();
    photoInserted.title = photo.title;
    photoInserted.path = photo.path;
    photoInserted.user = await repositoryUser.findOne(idUser);

    const result = await repositoryPhoto.save(photoInserted);

    return result;
  }

  async delete(id: number) {
    const repository = getRepository('photo');
    const photo = await repository.findOne(id);

    await repository.remove(photo);

    return photo;
  }

  async update(id: number, photo: Photo) {
    console.log(photo);
    const repository = getRepository('photo');
    const photoMatched: any = await repository.findOne(id);

    photoMatched.title = photo.title;
    photoMatched.path = photo.path;

    await repository.save(photoMatched);

    return photoMatched;
  }
}

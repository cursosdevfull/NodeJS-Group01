import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRedis, setRedis } from '../services/redis.service';

export class UserRepository {
  async list() {
    const usersCache = await getRedis('APP_USERS');
    if (usersCache) {
      return JSON.parse(usersCache);
    }

    const repository = getRepository('user');
    const users = await repository.find({ relations: ['photos'] });

    setRedis('APP_USERS', JSON.stringify(users));

    return users;
  }

  async insert(user: User) {
    const repository = getRepository('user');
    const userInserted = await repository.save(user);

    return userInserted;
  }

  async update(id: number, user: User) {
    const repository: Repository<User> = getRepository('user');
    const userMatched = await repository.findOne(id);

    userMatched.firstName = user.firstName;
    userMatched.lastName = user.lastName;
    userMatched.email = user.email;

    await repository.save(userMatched);

    return userMatched;
  }

  async delete(id: number) {
    const repository: Repository<User> = getRepository('user');
    const userDeleted = await repository.findOne(id);

    await repository.remove(userDeleted);

    return userDeleted;
  }
}

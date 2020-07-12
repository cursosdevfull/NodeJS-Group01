import { getConnection } from '../services/sequelize.service';
import { User } from '../models/user.model';

export default class UserRepository {
  async list() {
    const userRepository = getConnection().getRepository(User);

    const users = await userRepository.findAll({ include: ['tasks'] });

    return users ? users : null;
  }

  async insert(user: User) {
    const userRepository = await getConnection().getRepository(User);

    const userInserted = await userRepository.create(user);

    return userInserted;
  }

  async update(id: number, user: User) {
    const userRepository = await getConnection().getRepository(User);

    const status = await userRepository.update(user, { where: { id } });

    return status ? status : null;
  }

  async delete(id: number) {
    const userRepository = await getConnection().getRepository(User);

    const status = await userRepository.destroy({ where: { id } });

    return status ? status : null;
  }
}

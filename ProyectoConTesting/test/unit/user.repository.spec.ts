import { UserRepository } from '../../src/repositories/user.repository';
import { getRedis, setRedis } from '../../src/services/redis.service';
import mockUsers from '../mocks/users-list.json';

jest.mock('typeorm');
import * as typeorm from 'typeorm';

describe('user.repository.ts', () => {
  it('list users from redis', async () => {
    (getRedis as jest.Mock) = jest
      .fn()
      .mockResolvedValue(JSON.stringify(mockUsers));

    const userRepository: UserRepository = new UserRepository();
    const users = await userRepository.list();

    expect(users).toEqual(mockUsers);
  });

  it('list users without redis', async () => {
    (getRedis as jest.Mock) = jest.fn().mockResolvedValue(null);
    (setRedis as jest.Mock) = jest.fn().mockReturnValue(null);

    (typeorm.getRepository as jest.Mock) = jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue(mockUsers),
    });

    const userRepository: UserRepository = new UserRepository();
    const users = await userRepository.list();

    expect(users).toEqual(mockUsers);
    expect(setRedis).toHaveBeenCalled();
  });

  it('insert user', async () => {
    (typeorm.getRepository as jest.Mock) = jest.fn().mockReturnValue({
      save: jest.fn().mockResolvedValue(mockUsers[0].id),
    });

    const userRepository = new UserRepository();
    const idInserted = await userRepository.insert(mockUsers[0]);

    expect(idInserted).toBe(mockUsers[0].id);
  });

  it('update user', async () => {
    (typeorm.getRepository as jest.Mock) = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockUsers[1]),
      save: jest.fn().mockResolvedValue(null),
    });

    const userRepository = new UserRepository();
    const userUpdated = await userRepository.update(mockUsers[1].id, {
      firstName: 'Sergio',
      lastName: 'Hidalgo',
      email: 'sergiohidalgocaceres@gmail.com',
    });

    const userMocked = Object.assign(mockUsers[1]);
    userMocked.firstName = 'Sergio';
    userMocked.lastName = 'Hidalgo';
    userMocked.email = 'sergiohidalgocaceres@gmail.com';

    expect(userUpdated).toEqual(userMocked);
  });

  it('delete user', async () => {
    (typeorm.getRepository as jest.Mock) = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockUsers[2]),
      remove: jest.fn().mockResolvedValue(null),
    });

    const userRepository = new UserRepository();
    const userDeleted = await userRepository.delete(mockUsers[2].id);

    expect(userDeleted).toEqual(mockUsers[2]);
  });
});

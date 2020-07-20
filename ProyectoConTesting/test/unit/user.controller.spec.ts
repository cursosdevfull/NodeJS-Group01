import httpMock, { MockResponse, MockRequest } from 'node-mocks-http';
import { UserRepository } from '../../src/repositories/user.repository';
import mockUsers from '../mocks/users-list.json';
import { UserController } from '../../src/controllers/user.controller';

let req: MockRequest<any>, res: MockResponse<any>, next: any;

describe('user.controller.ts', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
  });

  it('list users', async () => {
    (UserRepository as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn().mockResolvedValue(mockUsers),
    });

    const userRepository = new UserRepository();
    const userController = new UserController(userRepository);

    await userController.list(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockUsers);
  });

  it('insert user', async () => {
    (UserRepository as jest.Mock) = jest.fn().mockReturnValue({
      insert: jest.fn().mockResolvedValue(mockUsers[1]),
    });

    const userRepository = new UserRepository();
    const userController = new UserController(userRepository);

    await userController.insert(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockUsers[1]);
  });
});

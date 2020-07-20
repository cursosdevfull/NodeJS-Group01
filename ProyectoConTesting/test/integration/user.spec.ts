import app from '../../src/app';
import request from 'supertest';
import { DatabaseService } from '../../src/services/database.service';
import RedisService from '../../src/services/redis.service';

import mockUsers from '../mocks/users-list.json';

const databaseService = new DatabaseService();
const redisService = new RedisService();

describe('integration user', () => {
  beforeAll(async () => {
    await databaseService.initialize();
    await redisService.initialize();
  });

  afterAll(async () => {
    databaseService.closeConnection();
    redisService.disconnect();
  });

  it('get /user', async () => {
    const response: any = await request(app).get('/user');

    expect(response.statusCode).toBe(200);
  });

  it('post /user', async () => {
    const response: any = await request(app).post('/user').send(mockUsers[0]);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('firstName');
    expect(response.body).toHaveProperty('lastName');
    expect(response.body).toHaveProperty('email');
  });

  it('put /user/:id', async () => {
    const responseOfCreate: any = await request(app).post('/user').send({
      firstName: 'Carmen',
      lastName: 'Hidalgo',
      email: 'shidalgo@correo.com',
      password: 'abc',
    });

    const responseOfUpdate = await request(app)
      .put('/user/' + responseOfCreate.body.id)
      .send({ firstName: 'Cintia', lastName: 'Arrue' });

    expect(responseOfUpdate.body).toHaveProperty('firstName', 'Cintia');
    expect(responseOfUpdate.body).toHaveProperty('lastName', 'Arrue');

    await request(app).delete('/user/' + responseOfCreate.body.id);
  });
});

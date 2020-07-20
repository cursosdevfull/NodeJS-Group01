import { AuthRepository } from '../repositories/auth.repository';
import { Request, Response } from 'express';
import Responses from '../utils/responses.util';

export class AuthController {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.login = this.login.bind(this);
    this.newAccessToken = this.newAccessToken.bind(this);
  }

  async login(req: Request, res: Response) {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const tokens = await this.authRepository.login(user);

    if (tokens) {
      Responses.send(res, 200, tokens);
    } else {
      Responses.send(res, 404, {});
    }
  }

  async newAccessToken(req: Request, res: Response) {
    const accessToken = await this.authRepository.generateNewAccessToken(
      req.body.refreshToken
    );

    console.log(accessToken);

    if (accessToken) {
      Responses.send(res, 200, { accessToken });
    } else {
      Responses.send(res, 401, {});
    }
  }
}

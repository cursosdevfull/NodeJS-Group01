import { NextFunction, Request, Response } from 'express';
import { HeaderUtil } from '../utils/header.util';
import Responses from '../utils/responses.util';
import { TokenService } from '../services/token.service';

export class AuthenticationGuard {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const headerAuthorization = HeaderUtil.getHeader(
      req.headers,
      'authorization'
    );

    if (headerAuthorization) {
      const partsHeader = headerAuthorization.split(' ');
      // Bearer <access token>

      if (partsHeader.length && partsHeader[0].toLowerCase() === 'bearer') {
        const accessToken = partsHeader[1];
        TokenService.validateAccessToken(accessToken)
          .then((payload) => {
            res.locals.roles = payload.roles;
            next();
          })
          .catch((err) => {
            Responses.send(res, err.status, {});
          });
      } else {
        Responses.send(res, 401, {});
      }
    } else {
      Responses.send(res, 401, {});
    }
  }
}

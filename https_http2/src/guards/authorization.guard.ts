import { NextFunction, Request, Response } from 'express';
import Responses from '../utils/responses.util';

export class AuthorizationGuard {
  static canActivate(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const quantityRoles = res.locals.roles.filter(
        (roleUser: string) => rolesAllowed.indexOf(roleUser) > -1
      ).length;

      console.log('quantityRoles', quantityRoles);

      if (quantityRoles) {
        next();
      } else {
        Responses.send(res, 409, {});
      }
    };
  }

  /*   canActivate("ADMIN","OPERATOR", "AUDITOR")
  roles = ["ADMIN","OPERATOR", "AUDITOR"] */
}

import * as randToken from 'rand-token';
import * as jwt from 'jwt-simple';
import moment from 'moment';

const keywordSecret = '12fe47fa-b538-4d62-b8bf-be73026f5738';

export class TokenService {
  static generateRefreshToken() {
    return randToken.uid(256);
  }

  static generateAccessToken(
    _id: string,
    firstName: string,
    lastName: string,
    roles: string[]
  ) {
    const payload = {
      iat: moment().unix(),
      exp: moment().add(10, 'minutes').unix(),
      _id,
      firstName,
      lastName,
      roles,
    };

    const accessToken = jwt.encode(payload, keywordSecret);

    return accessToken;
  }

  static validateAccessToken(accessToken: string): Promise<any> {
    const promiseValidation = new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(accessToken, keywordSecret);
        resolve(payload);
      } catch (error) {
        if (error.message.toLowerCase() === 'token expired') {
          reject({
            status: 403,
            message: 'Token expired',
          });
        } else {
          reject({
            status: 401,
            message: 'Token is invalid',
          });
        }
      }
    });

    return promiseValidation;
  }
}

import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import { TokenService } from '../services/token.service';

export class AuthRepository {
  async login(user: any) {
    const userDocument = await User.findOne({ email: user.email });

    if (userDocument) {
      const passwordEncrypted = userDocument.password;
      const password = user.password;

      const match = await bcryptjs.compare(password, passwordEncrypted);

      if (match) {
        const roles = userDocument.roles.map((role) => role.roleName);
        const refreshToken = TokenService.generateRefreshToken();
        const accessToken = TokenService.generateAccessToken(
          userDocument._id,
          userDocument.firstName,
          userDocument.lastName,
          roles
        );

        return { accessToken, refreshToken };
      }
      return null;
    }

    return null;
  }

  async generateNewAccessToken(refreshToken: string) {
    const user = await User.findOne({ refreshToken });

    if (user) {
      const newAccessToken = TokenService.generateAccessToken(
        user._id,
        user.firstName,
        user.lastName,
        user.roles
      );

      return newAccessToken;
    }

    return null;
  }
}

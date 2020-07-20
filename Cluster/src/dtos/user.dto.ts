export interface UserDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  refreshToken: string;
  roles: string[];
}

export class UserMapping {
  static map(item: any): UserDto {
    return {
      _id: item._id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      isActive: item.isActive,
      refreshToken: item.refreshToken,
      roles: item.roles.map((role: any) => role.roleName),
    };
  }

  static mapArray(items: any[]): UserDto[] {
    return items.map((item: any) => {
      return {
        _id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        isActive: item.isActive,
        refreshToken: item.refreshToken,
        roles: item.roles.map((role: any) => role.roleName),
      };
    });
  }
}

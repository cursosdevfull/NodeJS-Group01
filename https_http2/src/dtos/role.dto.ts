export interface RoleDto {
  _id: string;
  roleName: string;
  isActive: boolean;
}

export class RoleMapping {
  static map(item: {
    _id: string;
    roleName: string;
    isActive: boolean;
  }): RoleDto {
    return {
      _id: item._id,
      roleName: item.roleName,
      isActive: item.isActive,
    };
  }

  static mapArray(
    items: {
      _id: string;
      roleName: string;
      isActive: boolean;
    }[]
  ): RoleDto[] {
    const roleList: RoleDto[] = items.map((item) => {
      return {
        _id: item._id,
        roleName: item.roleName,
        isActive: item.isActive,
      };
    });

    return roleList;
  }
}

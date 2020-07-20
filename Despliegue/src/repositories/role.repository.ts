import Role, { IRoleDocument } from '../models/role.model';
import { RoleDto, RoleMapping } from '../dtos/role.dto';

export default class RoleRepository {
  async getAll(): Promise<RoleDto[]> {
    const roles: IRoleDocument[] = await Role.find();

    if (roles) {
      return RoleMapping.mapArray(roles);
    }
    return null;
  }

  async getById(_id: string): Promise<RoleDto> {
    const role: IRoleDocument = await Role.findById(_id);
    if (role) {
      return RoleMapping.map(role);
    }
    return null;
  }

  async insert(role: IRoleDocument): Promise<RoleDto> {
    const roleInserted: IRoleDocument = await Role.create(role);
    return RoleMapping.map(roleInserted);
  }

  async update(_id: string, role: IRoleDocument): Promise<RoleDto> {
    const matchRole: IRoleDocument = await Role.findOne({ _id });

    if (matchRole) {
      const roleUpdated = await Role.updateOne({ _id }, role);
      return RoleMapping.map(roleUpdated);
    }
    return null;
  }

  async delete(_id: string): Promise<RoleDto> {
    const matchRole: IRoleDocument = await Role.findOne({ _id });

    if (matchRole) {
      const roleDeleted = await Role.updateOne({ _id }, { isActive: false });
      return RoleMapping.map(roleDeleted);
    }
    return null;
  }
}

import Role, { IRoleDocument } from '../models/role.model';

export default class RoleRepository {
  async getAll(): Promise<IRoleDocument[]> {
    const roles: IRoleDocument[] = await Role.find();
    return roles;
  }

  async getById(_id: string): Promise<IRoleDocument> {
    const role: IRoleDocument = await Role.findById(_id);
    return role;
  }

  async insert(role: IRoleDocument): Promise<IRoleDocument> {
    const roleInserted: IRoleDocument = await Role.create(role);
    return roleInserted;
  }

  async update(_id: string, role: IRoleDocument): Promise<IRoleDocument> {
    const roleUpdated: IRoleDocument = await Role.findByIdAndUpdate(
      { _id },
      role,
      {
        new: true,
      }
    );
    return roleUpdated;
  }

  async delete(_id: string): Promise<IRoleDocument> {
    const roleDeleted: IRoleDocument = await Role.findByIdAndUpdate(
      { _id },
      { isActive: false },
      { new: true }
    );
    return roleDeleted;
  }
}

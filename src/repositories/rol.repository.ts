import { IRol, Rol } from '../models';

export default class rolRepository {
  async insertRole(rol: IRol) {
    const rolCreated = await Rol.create(rol);

    return rolCreated;
  }

  async getRoles() {
    const roles = await Rol.find();

    return roles;
  }

  async getRoleById(_id: string) {
    const role = await Rol.findById(_id);

    return role;
  }

  async updateRole(_id: string, rol: IRol) {
    const roleUpdated = await Rol.updateOne({ _id }, rol);

    return roleUpdated;
  }

  async deleteRole(_id: string) {
    const roleDeleted = await Rol.updateOne({ _id }, { active: false });

    return roleDeleted;
  }
}

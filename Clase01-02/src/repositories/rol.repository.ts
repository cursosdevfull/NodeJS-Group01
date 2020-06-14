import { IRol, Rol } from '../models';

export default class RolRepository {
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
    await Rol.updateOne({ _id }, rol);

    return { rol };
  }

  async deleteRole(_id: string) {
    await Rol.updateOne({ _id }, { active: false });

    return { _id };
  }
}

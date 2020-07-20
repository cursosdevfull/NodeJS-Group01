import User, { IUserDocument } from '../models/user.model';
import { UserDto, UserMapping } from '../dtos/user.dto';

export default class UserRepository {
  async getAll(): Promise<UserDto[]> {
    const users: IUserDocument[] = await User.find();

    if (users.length) {
      return UserMapping.mapArray(users);
    } else {
      return null;
    }
  }

  async getById(_id: string): Promise<UserDto> {
    const user: IUserDocument = await User.findById(_id);

    if (user) {
      return UserMapping.map(user);
    } else {
      return null;
    }
  }

  async insert(user: IUserDocument, refreshToken: string): Promise<UserDto> {
    user.refreshToken = refreshToken;
    const userInserted: IUserDocument = await User.create(user);
    if (userInserted) {
      return UserMapping.map(userInserted);
    }

    return null;
  }

  async update(_id: string, user: IUserDocument): Promise<UserDto> {
    const userUpdated: any = await User.findOne({ _id });
    const userJSON: any = Object.assign({}, user);

    for (let el in userJSON) {
      userUpdated[el] = userJSON[el];
    }
    await userUpdated.save();

    if (userUpdated) {
      return UserMapping.map(userUpdated);
    } else {
      return null;
    }
  }

  async delete(_id: string): Promise<UserDto> {
    const matchUser = await User.findOne({ _id });

    const user: IUserDocument = await User.findByIdAndUpdate(
      { _id },
      { isActive: false }
    );

    if (matchUser) {
      return UserMapping.map(user);
    } else {
      return null;
    }
  }
}

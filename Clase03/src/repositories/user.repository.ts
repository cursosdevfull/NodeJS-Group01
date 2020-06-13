import User, { IUserDocument } from '../models/user.model';
import Responses from '../utils/responses.util';
import bodyParser from 'body-parser';

export default class UserRepository {
  async getAll(): Promise<IUserDocument[]> {
    const users: IUserDocument[] = await User.find();
    return users;
  }

  async getById(_id: string): Promise<IUserDocument> {
    const user: IUserDocument = await User.findById(_id);
    return user;
  }

  async insert(user: IUserDocument): Promise<IUserDocument> {
    const userInserted: IUserDocument = await User.create(user);
    return userInserted;
  }

  async update(_id: string, user: IUserDocument): Promise<IUserDocument> {
    const userUpdated: any = await User.findById(_id);
    const userJSON: any = Object.assign({}, user);

    for (let el in userJSON) {
      userUpdated[el] = userJSON[el];
    }
    await userUpdated.save();

    return userUpdated;
  }

  async delete(_id: string): Promise<IUserDocument> {
    const user: IUserDocument = await User.findByIdAndUpdate(
      { _id },
      { isActive: false }
    );
    return user;
  }
}

import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUserDocument extends Document {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  roles?: any[];
  refreshToken?: string;
  photo?: string;
}

const schema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    email: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],

  refreshToken: String,

  photo: String,
});

schema.pre('save', async function (next) {
  const self: IUserDocument = this as IUserDocument;

  if (this.isModified('password')) {
    self.password = await bcryptjs.hash(self.password, 10);
  }
  next();
});

function autoPopulate(next: any) {
  this.populate('roles');
  next();
}

schema.pre('find', autoPopulate);
schema.pre('findOne', autoPopulate);

export default mongoose.model<IUserDocument>('User', schema);

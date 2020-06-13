import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
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
});

schema.pre('save', async function (next) {
  const self: IUserDocument = this as IUserDocument;

  if (this.isModified('password')) {
    self.password = await bcryptjs.hash(self.password, 10);
  }
  next();
});

export default mongoose.model<IUserDocument>('User', schema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IRoleDocument extends Document {
  roleName: string;
  isActive: boolean;
}

const schema: Schema = new Schema({
  roleName: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<IRoleDocument>('Role', schema);

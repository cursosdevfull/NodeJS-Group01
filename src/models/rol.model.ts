import mongoose, { Schema, Document } from 'mongoose';

export interface IRol extends Document {
  rolName: string;
  active: boolean;
}

const schema: Schema = new Schema({
  rolName: {
    type: String,
    required: true,
  },

  active: {
    type: Boolean,
    default: 1,
  },
});

export default mongoose.model<IRol>('Rol', schema);

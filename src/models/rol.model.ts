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
    defaultsTo: true,
  },
});

export default mongoose.model<IRol>('Rol', schema);

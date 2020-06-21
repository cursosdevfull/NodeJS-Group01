import mongoose, { Types } from 'mongoose';

export const objectId = (joi: any): any => ({
  type: 'objectId',
  base: joi.any(),
  messages: {
    objectId: 'needs to be a valid ObjectId',
  },
  coerce(value: any) {
    if (!value) {
      return;
    }

    if (String(value).match(/^[0-9a-fA-F]{24}$/)) {
      value = new Types.ObjectId(value);
    }

    return { value };
  },
  validate(value: any, helpers: any) {
    if (!(value instanceof Types.ObjectId)) {
      const errors = helpers.error('objectId');
      return { value, errors };
    }
  },
});

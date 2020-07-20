import Joi from '@hapi/joi';
import { objectId } from './extensions/joi.extension';

const customJoi = Joi.extend(objectId);

export const userSchemas = {
  INSERT: {
    body: customJoi.object({
      firstName: customJoi.string().required(),
      lastName: customJoi.string().required(),
      email: customJoi.string().email().required(),
      password: customJoi.string().required(),
      roles: customJoi.array().required(),
      isActive: customJoi.boolean(),
    }),
  },
  UPDATE: {
    body: customJoi.object({
      firstName: customJoi.string(),
      lastName: customJoi.string(),
      email: customJoi.string().email(),
      password: customJoi.string(),
      roles: customJoi.array(),
      isActive: customJoi.boolean(),
    }),
    params: customJoi.object({
      _id: customJoi.objectId(),
    }),
  },
};

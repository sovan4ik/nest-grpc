import Joi from 'joi';

export const UserSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
});

export const UsersSchema = Joi.array().items(UserSchema);

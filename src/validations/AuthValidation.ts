import Joi from 'joi';

const registerValidation = Joi.object({
  fullName: Joi.string().max(200).required(),
  email: Joi.string().email().max(200).required(),
  password: Joi.string().max(200).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().max(200).required(),
  password: Joi.string().max(200).required(),
});

const meValidation = Joi.string().email().max(200).required();

export { registerValidation, loginValidation, meValidation };

import Joi from "joi";

export const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const issueSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  importance: Joi.string().valid("High", "Mid", "Low").required(),
  status: Joi.string().valid("Pending", "Done", "In Progress").required(),
  dueDate: Joi.date().greater("now").required(),
});

export const commentSchema = Joi.object({
  comment: Joi.string().required(),
  author: Joi.string().required(),
});

export const registerUserSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("Administrator", "Developer").required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

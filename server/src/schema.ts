import Joi from "joi";

// Project Schema

export const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

// Issue Schema

export const issueSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  importance: Joi.string().valid("High", "Mid", "Low").required(),
  dueDate: Joi.date().greater("now").required(),
});

// Comment Schema

export const commentSchema = Joi.object({
  comment: Joi.string().required(),
});

// Issue assignedTo Schema

export const issueAssignedToSchema = Joi.object({
  assignedTo: Joi.array().items(Joi.string().required()).required(),
});

// Issue status Schema

export const issueStatusSchema = Joi.object({
  status: Joi.string().valid("Pending", "In Progress", "Done").required(),
});

// User username Schema

export const userUsernameSchema = Joi.object({
  username: Joi.string().required(),
});

// User password Schema

export const userPasswordSchema = Joi.object({
  password: Joi.string().required(),
});

// User role Schema

export const userRoleSchema = Joi.object({
  role: Joi.string().valid("Administrator", "Developer").required(),
});

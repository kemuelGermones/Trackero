import Joi from "joi";

export const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const issueSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  importance: Joi.string().valid("High", "Mid", "Low").required(),
  dueDate: Joi.date().greater("now").required(),
});

export const commentSchema = Joi.object({
  comment: Joi.string().required(),
});

export const issueAssignedToSchema = Joi.object({
  assignedTo: Joi.array().items(Joi.string().required()).required()
});

export const issueStatusSchema = Joi.object({
  status: Joi.string().valid("Pending", "In Progress", "Done").required()
});
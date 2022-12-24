import Joi from "joi";

export const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const newIssueSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  importance: Joi.string().valid("high", "mid", "low").required(),
  status: Joi.string().valid("pending", "done").required(),
  dueDate: Joi.date().greater("now").required(),
});

export const editIssueSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  importance: Joi.string().valid("high", "mid", "low").required(),
  status: Joi.string().valid("pending", "done").required(),
  dueDate: Joi.date().required(),
});

export const commentSchema = Joi.object({
  comment: Joi.string().required(),
});

import Joi from "joi";

export const projectSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
});

export const issueSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    importance: Joi.string().required()
});

export const commentSchema = Joi.object({
    comment: Joi.string().required()
});



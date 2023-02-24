import BaseJoi, { Root, CustomHelpers } from "joi";
import sanitizeHtml from "sanitize-html";

// Adds a escapeHTML method to joi and checks if the
// a input contains HTML elements

const extension = (joi: Root) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value: string, helpers: CustomHelpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) {
          return helpers.error("string.escapeHTML", { value });
        }
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

// Project Schema

export const projectSchema = Joi.object({
  title: Joi.string().escapeHTML().required(),
  description: Joi.string().escapeHTML().required(),
  assignees: Joi.array()
    .items(Joi.string().escapeHTML().required())
    .unique((a: string, b: string) => a === b)
    .required(),
});

// Issue Schema

export const issueSchema = Joi.object({
  title: Joi.string().escapeHTML().required(),
  description: Joi.string().escapeHTML().required(),
  importance: Joi.string().valid("High", "Mid", "Low").required(),
  assignedTo: Joi.string().escapeHTML().required(),
  dueDate: Joi.date().greater("now").required(),
});

// Comment Schema

export const commentSchema = Joi.object({
  comment: Joi.string().escapeHTML().required(),
});

// Issue status Schema

export const issueStatusSchema = Joi.object({
  status: Joi.string().valid("Pending", "In Progress", "Done").required(),
});

// User username Schema

export const userUsernameSchema = Joi.object({
  username: Joi.string().escapeHTML().required(),
});

// User password Schema

export const userPasswordSchema = Joi.object({
  password: Joi.string().escapeHTML().required(),
});

// User role Schema

export const userRoleSchema = Joi.object({
  role: Joi.string().valid("Administrator", "Developer").required(),
});

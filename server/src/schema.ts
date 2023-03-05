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
  title: Joi.string().escapeHTML(),
  description: Joi.string().escapeHTML(),
  importance: Joi.string().valid("High", "Mid", "Low"),
  status: Joi.string().valid("Pending", "In Progress", "Done"),
  assignedTo: Joi.string().escapeHTML(),
  dueDate: Joi.date().greater("now"),
});

// Comment Schema

export const commentSchema = Joi.object({
  comment: Joi.string().escapeHTML().required(),
});

// User Schema

export const userSchema = Joi.object({
  email: Joi.string().email().escapeHTML(),
  username: Joi.string().escapeHTML(),
  password: Joi.string().escapeHTML(),
  role: Joi.string().valid("Administrator", "Developer"),
});

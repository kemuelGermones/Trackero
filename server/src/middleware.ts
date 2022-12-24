import { Request, Response, NextFunction } from "express";
import AppError from "./utils/AppError";
import { projectSchema, newIssueSchema, editIssueSchema, commentSchema } from "./schema";

export const validateProject = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

export const validateNewIssue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = newIssueSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

export const validateEditIssue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = editIssueSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

export const validateComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

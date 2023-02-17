import { Request, Response, NextFunction } from "express";
import Project from "../models/project";
import Issue from "../models/issue";
import User from "../models/user";
import { ValidationError } from "joi";
import AppError from "../utils/AppError";
import {
  projectSchema,
  issueSchema,
  commentSchema,
  issueStatusSchema,
  userPasswordSchema,
  userRoleSchema,
  userUsernameSchema,
} from "../schema";

interface IValidationError {
  error: ValidationError;
}

// Validate Project Request

export const validateProject = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = projectSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validate Issue Request

export const validateIssue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = issueSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates Issue Status Request

export const validateStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = issueStatusSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validate Comment Request

export const validateComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates User Username Request

export const validateUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = userUsernameSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates User Password Request

export const validatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = userPasswordSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validate User Role Request

export const validateRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = userRoleSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates Assignees

export const validateAssignees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  for (let userId of req.body.assignees) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User/s doesn't exist", 400);
    }
  }
  next();
};

// Validates if the user is a project assignee

export const validateProjectAssignee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = await Project.findById(req.params.projectId);
  const foundUser = project!.assignees.find((userId) =>
    userId.equals(req.body.assignedTo)
  );
  if (foundUser) {
    throw new AppError("User is not a project assignee", 400);
  }
  next();
};

// Validate if the users has assigned issue

export const validateAssigneesHasIssues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = await Project.findById(req.params.projectId);
  for (let issueId of project!.issues) {
    const issue = await Issue.findById(issueId);
    const foundUser = req.body.assignees.find((userId: string) =>
      issue!.assignedTo.equals(userId)
    );
    if (foundUser) {
      throw new AppError("A User has an assigned issue", 400);
    }
  }
  next();
};

import { Request, Response, NextFunction } from "express";
import Project from "../models/project";
import Issue from "../models/issue";
import User from "../models/user";
import { Schema, ValidationError } from "joi";
import AppError from "../utils/AppError";
import {
  projectSchema,
  issueSchema,
  commentSchema,
  userSchema,
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
  const { error }: IValidationError = issueSchema
    .fork(
      ["title", "description", "importance", "assignedTo", "dueDate"],
      (field: Schema) => field.required()
    )
    .validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates Issue Status Request

export const validateIssueStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = issueSchema
    .fork(["status"], (field: Schema) => field.required())
    .validate(req.body);
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

// Validate Register

export const validateUserRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = userSchema
    .fork(["email", "password", "username", "role"], (field: Schema) =>
      field.required()
    )
    .validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validate login

export const validateUserLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = userSchema
    .fork(["email", "password"], (field: Schema) => field.required())
    .validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates User Username Request

export const validateUserUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = userSchema
    .fork(["username"], (field: Schema) => field.required())
    .validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates User Password Request

export const validateUserPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = userSchema
    .fork(["password"], (field: Schema) => field.required())
    .validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validate User Role Request

export const validateUserRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: IValidationError = userSchema
    .fork(["role"], (field: Schema) => field.required())
    .validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates if assignees are valid users

export const validateProjectAssignees = async (
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

// Validates if the user is a valid issue assignedTo

export const validateIssueAssignedTo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = await Project.findById(req.params.projectId);
  const foundUser = project!.assignees.find((userId) =>
    userId.equals(req.body.assignedTo)
  );
  if (!foundUser) {
    throw new AppError("User is not a project assignee", 400);
  }
  next();
};

// Validates if the assignees has a assigned issue

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
    if (!foundUser) {
      throw new AppError("Cannot remove a user that has a assigned issue", 400);
    }
  }
  next();
};

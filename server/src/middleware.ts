import { Request, Response, NextFunction } from "express";
import User from "./models/user";
import Comment from "./models/comment";
import Issue from "./models/issue";
import AppError from "./utils/AppError";
import {
  projectSchema,
  issueSchema,
  commentSchema,
  issueAssignedToSchema,
  issueStatusSchema,
} from "./schema";

// Validate Project Request

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

// Validate Issue Request

export const validateIssue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = issueSchema.validate(req.body);
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
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

// Validates if the user is the owner of a issue

export const isIssueAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { issueId } = req.params;
  const issue = await Issue.findById(issueId);
  if (!issue?.author!.equals(req.user!._id)) {
    return res.status(400).json({
      status: 400,
      message: "You are not allowed to edit/delete this issue",
    });
  }
  next();
};

// Validates if the user is the owner of a comment

export const isCommentAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment?.author!.equals(req.user!._id)) {
    return res.status(400).json({
      status: 400,
      message: "You are not allowed to delete this comment",
    });
  }
  next();
};

// Validates if all members are valid users

export const isValidUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = issueAssignedToSchema.validate(req.body)
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return res
      .status(400)
      .json({ status: 400, message: msg });
  }
  const { assignedTo } = req.body;
  const assignedSet = new Set(assignedTo);
  if (assignedTo.length !== assignedSet.size) {
    return res.status(400).json({ status: 400, message: "Duplicate users" });
  }
  for (let userId of assignedTo) {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "Some users doesn't exist" });
    }
  }
  next();
};

// Validates issue status

export const isValidStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = issueStatusSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

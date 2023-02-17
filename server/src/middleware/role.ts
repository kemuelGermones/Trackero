import { Request, Response, NextFunction } from "express";
import Project from "../models/project";
import User from "../models/user";
import Comment from "../models/comment";
import Issue from "../models/issue";
import AppError from "../utils/AppError";

// Validates if the user is admin

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user!.role !== "Administrator") {
    throw new AppError("You are not an admin", 403);
  } else {
    next();
  }
};

// Validates if the user is admin or comment author

export const isAdminOrCommentAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await Comment.findById(req.params.commentId);
  if (
    req.user!.role === "Administrator" ||
    comment!.author!.equals(req.user!._id)
  ) {
    next();
  } else {
    throw new AppError("You are not allowed to delete this comment", 403);
  }
};

// Validates if the user is admin or issue author

export const isAdminOrIssueAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const issue = await Issue.findById(req.params.issueId);
  if (
    req.user!.role === "Administrator" ||
    issue!.author!.equals(req.user!._id)
  ) {
    next();
  } else {
    throw new AppError("You are not allowed to edit/delete this issue", 403);
  }
};

// Validates if the user is admin, issue author or assigned user

export const isAdminOrIssueAuthorOrAssignedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const issue = await Issue.findById(req.params.issueId);
  if (
    req.user!.role === "Administrator" ||
    issue!.author!.equals(req.user!._id) ||
    issue!.assignedTo!.equals(req.user!._id)
  ) {
    next();
  } else {
    throw new AppError("You are not allowed to update this issue", 403);
  }
};

// Validates if the user is admin or is the actual owner of his/her account

export const isAdminOrActualUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.params.userId);
  if (req.user!.role === "Administrator" || user!._id!.equals(req.user!._id)) {
    next();
  } else {
    throw new AppError("You are not allowed to update this user", 403);
  }
};

// Validates if the user is not actual owner of his/her account

export const isNotActualUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.params.userId);
  if (!user!._id!.equals(req.user!._id)) {
    next();
  } else {
    throw new AppError("You are not allowed to update this user", 403);
  }
};

// Validates if the user is a project assignee

export const isAdminOrProjectAssignee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = await Project.findById(req.params.projectId);
  const foundUser = project!.assignees.find((userId) =>
    userId.equals(req.user!._id)
  );
  if (foundUser || req.user!.role === "Administrator") {
    next();
  } else {
    throw new AppError("You are not a project assignee", 403);
  }
};

import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Comment from "../models/comment";
import Issue from "../models/issue";
import AppError from "../utils/AppError";

// Validates if the user is admin

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user!.role !== "Administrator") {
    throw new AppError("You are not an admin", 400);
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
    throw new AppError("You are not allowed to delete this comment", 400);
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
    throw new AppError("You are not allowed to edit/delete this issue", 400);
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
    throw new AppError("You are not allowed to edit/delete this issue", 400);
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
    throw new AppError("You are not allowed to update this user", 400);
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
    throw new AppError("You are not allowed to update this user", 400);
  }
};

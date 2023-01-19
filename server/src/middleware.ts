import { Request, Response, NextFunction } from "express";
import Comment from "./models/comment";
import User from "./models/user";
import AppError from "./utils/AppError";
import {
  projectSchema,
  issueSchema,
  commentSchema,
  registerUserSchema,
  loginUserSchema,
} from "./schema";

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

export const validateNewUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

export const validateOldUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

export const isCommentAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentId, userId } = req.params;
  const comment = await Comment.findById(commentId);
  if (comment && !comment.author.equals(userId)) {
    return res.status(400).json({
      status: 400,
      message: "You do not have permission to delete this comment",
    });
  }
  next();
};

export const isValidAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { author: userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ status: 400, message: "User doesn't exist" });
  }
  next();
};

export const isValidMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { members } = req.body;
  const membersSet = new Set(members);
  if (members.length !== membersSet.size) {
    return res.status(400).json({ status: 400, message: "Duplicate users" });
  }
  for (let userId of members) {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "Some users doesn't exist" });
    }
  }
  next();
};

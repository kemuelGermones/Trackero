import { Request, Response, NextFunction } from "express";
import AppError from "./utils/AppError";
import { projectSchema, issueSchema, commentSchema } from "./schema";

export const validateProject = (req: Request, res: Response, next: NextFunction) => {
    const { error } = projectSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new AppError(msg, 400);
    } else {
        next();
    }
}

export const validateIssue = (req: Request, res: Response, next: NextFunction) => {
    const { error } = issueSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new AppError(msg, 400);
    } else {
        next();
    }
}

export const validateComment = (req: Request, res: Response, next: NextFunction) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new AppError(msg, 400);
    } else {
        next();
    }
}
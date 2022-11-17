import { Request, Response } from "express";
import Comment from "../models/comment";
import Project from "../models/project";

// Create comment

export const createComment = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  const comment = new Comment(req.body);
  project?.comments.push(comment._id);
  await comment.save();
  await project?.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully created a comment" });
};

// Delete comment

export const deleteComment = async (req: Request, res: Response) => {
  const { projectId, commentId } = req.params;
  await Project.findByIdAndUpdate(projectId, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res
    .status(200)
    .json({ status: 200, message: "Successfully deleted a comment" });
};

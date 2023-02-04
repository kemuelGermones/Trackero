import { Request, Response } from "express";
import Comment from "../models/comment";
import Issue from "../models/issue";
import Project from "../models/project"

// Create Issue Comment

export const createComment = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const issue = await Issue.findById(issueId);
  const comment = new Comment(req.body);
  comment.author = req.user!._id;
  issue!.comments.push(comment._id);
  await comment.save();
  await issue!.save();
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Created a comment", payload: projects });
};

// Delete Issue Comment

export const deleteComment = async (req: Request, res: Response) => {
  const { issueId, commentId } = req.params;
  await Issue.findByIdAndUpdate(issueId, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res
    .status(200)
    .json({ status: 200, message: "Deleted a comment" });
};

import { Request, Response } from "express";
import Comment from "../models/comment";
import Issue from "../models/issue";
import Project from "../models/project";

// Create Issue

export const createIssue = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  const issue = new Issue(req.body);
  issue.author = req.user!._id;
  project!.issues.push(issue._id);
  await issue.save();
  await project!.save();
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Created an issue", payload: projects });
};

// Edit Issue

export const editIssue = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  await Issue.findByIdAndUpdate(issueId, req.body);
  res.status(200).json({ status: 200, message: "Edited an issue" });
};

// Delete Issue

export const deleteIssue = async (req: Request, res: Response) => {
  const { projectId, issueId } = req.params;
  await Project.findByIdAndUpdate(projectId, { $pull: { issues: issueId } });
  await Issue.findByIdAndDelete(issueId);
  res.status(200).json({ status: 200, message: "Deleted an issue" });
};

// Update Issue Status

export const updateIssueStatus = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const { status }: { status: "Pending" | "In Progress" | "Done" } = req.body;
  const issue = await Issue.findById(issueId);
  issue!.status = status;
  await issue!.save();
  res.status(200).json({
    status: 200,
    message: "Updated the issue status",
  });
};

// Create Issue Comment

export const createIssueComment = async (req: Request, res: Response) => {
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
    .json({ status: 200, message: "Posted a comment", payload: projects });
};

// Delete Issue Comment

export const deleteIssueComment = async (req: Request, res: Response) => {
  const { issueId, commentId } = req.params;
  await Issue.findByIdAndUpdate(issueId, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res.status(200).json({ status: 200, message: "Deleted a comment" });
};

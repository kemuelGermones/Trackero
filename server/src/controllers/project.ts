import { Request, Response } from "express";
import Project from "../models/project";
import Comment from "../models/comment";
import Issue from "../models/issue";

// Show Projects

export const showProjects = async (
  req: Request,
  res: Response,
) => {
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Show all project", payload: projects });
};

// Create New Project

export const createProject = async (req: Request, res: Response) => {
  const project = new Project(req.body);
  await project.save();
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Created a project", payload: projects });
};

// Edit Project

export const editProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  await Project.findByIdAndUpdate(projectId, req.body);
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Edited a project", payload: projects });
};

// Delete project

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  await Project.findByIdAndDelete(projectId);
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Deleted a project", payload: projects });
};

// Create Comment

export const createComment = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  const comment = new Comment(req.body);
  comment.author = req.user!._id;
  project!.comments.push(comment._id);
  await comment.save();
  await project!.save();
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Posted a comment", payload: projects });
};

// Delete Comment

export const deleteComment = async (req: Request, res: Response) => {
  const { projectId, commentId } = req.params;
  await Project.findByIdAndUpdate(projectId, {
    $pull: { comments: commentId },
  });
  await Comment.findByIdAndDelete(commentId);
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Deleted a comment", payload: projects });
};

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
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Edited an issue", payload: projects });
};

// Delete Issue

export const deleteIssue = async (req: Request, res: Response) => {
  const { projectId, issueId } = req.params;
  await Project.findByIdAndUpdate(projectId, { $pull: { issues: issueId } });
  await Issue.findByIdAndDelete(issueId);
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Deleted an issue", payload: projects });
};

// Update Issue Status

export const updateIssueStatus = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const { status }: { status: "Pending" | "In Progress" | "Done" } = req.body;
  const issue = await Issue.findById(issueId);
  issue!.status = status;
  await issue!.save();
  const projects = await Project.find();
  res
    .status(200)
    .json({
      status: 200,
      message: "Updated the issue status",
      payload: projects,
    });
};

import { Request, Response } from "express";
import Project from "../models/project";
import Comment from "../models/comment";

// Show Projects

export const showProjects = async (req: Request, res: Response) => {
  const projects = await Project.find();
  res
    .status(200)
    .send({ status: 200, message: "Fetched projects", payload: projects });
};

// Create Project

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
  res.status(200).json({ status: 200, message: "Edited a project" });
};

// Delete project

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  await Project.findByIdAndDelete(projectId);
  res.status(200).json({ status: 200, message: "Deleted a project" });
};

// Create Project Comment

export const createProjectComment = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const comment = new Comment(req.body);
  comment.author = req.user!._id;
  await comment.save();
  await Project.findByIdAndUpdate(projectId, {
    $push: { comments: comment._id },
  });
  const projects = await Project.find();
  res
    .status(200)
    .json({ status: 200, message: "Posted a comment", payload: projects });
};

// Delete Project Comment

export const deleteProjectComment = async (req: Request, res: Response) => {
  const { projectId, commentId } = req.params;
  await Project.findByIdAndUpdate(projectId, {
    $pull: { comments: commentId },
  });
  await Comment.findByIdAndDelete(commentId);
  res.status(200).json({ status: 200, message: "Deleted a comment" });
};

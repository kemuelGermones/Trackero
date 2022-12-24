import { Request, Response } from "express";
import Project from "../models/project";

// Create new project

export const createProject = async (req: Request, res: Response) => {
  const project = new Project(req.body);
  await project.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully created a project" });
};

// Show all projects

export const showProjects = async (req: Request, res: Response) => {
  const projects = await Project.find()
    .populate({ path: "issues", populate: { path: "comments" } })
    .populate("comments");
  res.status(200).send(projects);
};

// Show individual project

export const showIndividualProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId)
    .populate({ path: "issues", populate: { path: "comments" } })
    .populate("comments");
  res.status(200).send(project);
};

// Edit project

export const editProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  await Project.findByIdAndUpdate(projectId, req.body);
  res
    .status(200)
    .json({ status: 200, message: "Successfully edited a project" });
};

// Delete project

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  await Project.findByIdAndDelete(projectId);
  res
    .status(200)
    .json({ status: 200, message: "Successfully deleted a project" });
};

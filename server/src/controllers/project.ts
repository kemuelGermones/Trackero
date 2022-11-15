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
  const projects = await Project.find();
  res.status(200).send(projects);
};

// Show individual project

export const showIndividualProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  res.status(200).send(project);
};

// Edit project

export const editProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Project.findByIdAndUpdate(id, req.body);
  res
    .status(200)
    .json({ status: 200, message: "Successfully edited a project" });
};

// Delete project

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: 200, message: "Successfully deleted a project" });
};

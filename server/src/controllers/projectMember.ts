import { Request, Response } from "express";
import Project from "../models/project";

export const updateMembers = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  project!.members = req.body.members;
  await project?.save();
  res.status(200).json({ status: 200, message: "Successfully added members" });
};

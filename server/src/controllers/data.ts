import { Request, Response } from "express";
import Project from "../models/project";
import User from "../models/user";

export const getData = async (req: Request, res: Response) => {
  const projects = await Project.find();
  const users = await User.find().select("_id username role email");
  res.status(200).send({ projects, users });
};

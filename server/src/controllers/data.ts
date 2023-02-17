import { Request, Response } from "express";
import Project from "../models/project";
import User from "../models/user";

// Get Projects and Users

export const getData = async (req: Request, res: Response) => {
  const projects = await Project.find();
  const users = await User.find();
  res.status(200).json({
    status: 200,
    message: "Fetched projects and users data",
    payload: { projects, users },
  });
};

import { Request, Response } from "express";
import Project from "../models/project";
import Comment from "../models/comment";
import Issue from "../models/issue";

// Create New Project

export const createProject = async (req: Request, res: Response) => {
  const project = new Project(req.body);
  await project.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully created a project" });
};

// Show All Projects

export const showProjects = async (req: Request, res: Response) => {
  const projects = await Project.find()
    .populate({
      path: "issues",
      populate: [
        {
          path: "comments",
          populate: { path: "author", select: "username _id role email" },
        },
        {
          path: "author",
          select: "username _id role email",
        },
        {
          path: "assignedTo",
          select: "username _id role email",
        },
      ],
    })
    .populate({
      path: "comments",
      populate: { path: "author", select: "username _id role email" },
    })
  res.status(200).send(projects);
};

// Edit Project

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

// Create Comment

export const createComment = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  const comment = new Comment(req.body);
  comment.author = req.user!._id;
  project!.comments.push(comment._id);
  await comment.save();
  await project!.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully created a comment" });
};

// Delete Comment

export const deleteComment = async (req: Request, res: Response) => {
  const { projectId, commentId } = req.params;
  await Project.findByIdAndUpdate(projectId, {
    $pull: { comments: commentId },
  });
  await Comment.findByIdAndDelete(commentId);
  res
    .status(200)
    .json({ status: 200, message: "Successfully deleted a comment" });
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
  res
    .status(200)
    .json({ status: 200, message: "Successfully created an issue" });
};

// Edit Issue

export const editIssue = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  await Issue.findByIdAndUpdate(issueId, req.body);
  res
    .status(200)
    .json({ status: 200, message: "Successfully edited an issue" });
};

// Delete Issue

export const deleteIssue = async (req: Request, res: Response) => {
  const { projectId, issueId } = req.params;
  await Project.findByIdAndUpdate(projectId, { $pull: { issues: issueId } });
  await Issue.findByIdAndDelete(issueId);
  res
    .status(200)
    .json({ status: 200, message: "Successfully deleted an issue" });
};

// Update Issue Status

export const updateIssueStatus = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const { status }: { status: "Pending" | "In Progress" | "Done" } = req.body
  const issue = await Issue.findById(issueId);
  issue!.status = status;
  await issue!.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully updated the status" });
};

// Update Project Issue Assigned To

export const updateIssueAssignedTo = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const issue = await Issue.findById(issueId);
  issue!.assignedTo = req.body.assignedTo;
  await issue!.save();
  res.status(200).json({ status: 200, message: "Updated assigned to issue" });
};

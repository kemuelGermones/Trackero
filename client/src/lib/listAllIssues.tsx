import { IIssue, IProject } from "../types/interface";

// list All Issues

const listAllIssues = (projects: IProject[]): IIssue[] => {
  if (projects.length === 0) return [];
  return projects[0].issues.concat(listAllIssues(projects.slice(1)));
};

export default listAllIssues;

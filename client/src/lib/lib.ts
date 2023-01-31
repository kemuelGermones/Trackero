import store from "../store";

import { IProject, IIssue, IUser } from "../types/interface";

// Sort issues

export const sortIssues = (issues: IIssue[], category: string) => {
  //SORT BY DATE
  if (category === "dueDate" && Array.isArray(issues)) {
    return [...issues].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }

  //SORT BY STATUS
  if (category === "status" && Array.isArray(issues)) {
    return [...issues].sort((a, b) => {
      let A: number;
      let B: number;

      if (a.status === "Pending") {
        A = 1;
      } else if (a.status === "In Progress") {
        A = 2;
      } else {
        A = 3;
      }

      if (b.status === "Pending") {
        B = 1;
      } else if (b.status === "In Progress") {
        B = 2;
      } else {
        B = 3;
      }

      return A - B;
    });
  }

  //SORT BY IMPORTANCE
  if (category === "importance" && Array.isArray(issues)) {
    return [...issues].sort((a, b) => {
      let A: number;
      let B: number;

      if (a.importance === "High") {
        A = 1;
      } else if (a.importance === "Mid") {
        A = 2;
      } else {
        A = 3;
      }

      if (b.importance === "High") {
        B = 1;
      } else if (b.importance === "Mid") {
        B = 2;
      } else {
        B = 3;
      }

      return A - B;
    });
  }

  // SORT BY YOUR ISSUES
  if (category === "yourIssues" && Array.isArray(issues)) {
    const userId = store.getState().user.userId;
    return [...issues].filter((issue) => issue.author._id === userId);
  }

  // SORT BY ASSIGNED ISSUES
  if (category === "assignedIssues" && Array.isArray(issues)) {
    const userId = store.getState().user.userId;
    return [...issues].filter(
      (issue) => issue.assignedTo.findIndex((user: IUser) => user._id === userId) > -1
    );
  }

  return issues;
};

// List all issues

export const listAllIssues = (projects: IProject[]): IIssue[] => {
  if (projects.length === 0) return [];
  return projects[0].issues.concat(listAllIssues(projects.slice(1)));
};

// Find Project id

export const foundProjectId = (
  projects: IProject[],
  issueId: string
): string | null => {
  const projectId = projects.find(
    (project) =>
      project.issues.findIndex((issue) => issue._id === issueId) !== -1
  )?._id;
  return projectId ? projectId : null;
};

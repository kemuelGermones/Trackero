import store from "../store";
import { IIssue, IUser } from "../types/interface";

// Sort Issues

const sortAndFilterIssues = (issues: IIssue[], category: string) => {
  // Sort by Date

  if (category === "Due Date" && Array.isArray(issues)) {
    return [...issues].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }

  // Sort by Status

  if (category === "Status" && Array.isArray(issues)) {
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

  // Sort by Importance

  if (category === "Importance" && Array.isArray(issues)) {
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

  // Filter by Your Issues

  if (category === "Your Issues" && Array.isArray(issues)) {
    const userId = store.getState().user.userId;
    return [...issues].filter((issue) => issue.author._id === userId);
  }

  // Filter by Assigned Issues

  if (category === "Assigned Issues" && Array.isArray(issues)) {
    const userId = store.getState().user.userId;
    return [...issues].filter(
      (issue) =>
        issue.assignedTo.findIndex((user: IUser) => user._id === userId) > -1
    );
  }

  return issues;
};

export default sortAndFilterIssues;

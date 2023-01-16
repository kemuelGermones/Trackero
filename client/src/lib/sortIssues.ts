import { IModifiedIssue, IIssue } from "../types/interface";

function sortIssues(issues: IModifiedIssue[] | IIssue[], category: string) {
  //SORT BY DATE
  if (category === "dueDate") {
    return [...issues].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }
  //SORT BY STATUS
  if (category === "status") {
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
  if (category === "importance") {
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
  return issues;
}

export default sortIssues;

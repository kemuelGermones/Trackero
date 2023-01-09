import { IProject, IModifiedIssue } from "../types/interface";

function modifyIssueList(projectList: IProject[]) {
  let arr: IModifiedIssue[] = [];
  for (let project of projectList) {
    if (project.issues.length !== 0) {
      for (let issue of project.issues) {
        const modifiedIssue: IModifiedIssue = {
          ...issue,
          projectId: project._id,
          projectName: project.title,
        };
        arr.push(modifiedIssue);
      }
    }
  }
  return arr;
}

export default modifyIssueList
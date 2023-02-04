import { IProject } from "../types/interface";

// Find Project Id

const foundProjectId = (
  projects: IProject[],
  issueId: string
): string | null => {
  const projectId = projects.find(
    (project) =>
      project.issues.findIndex((issue) => issue._id === issueId) !== -1
  )?._id;
  return projectId ? projectId : null;
};

export default foundProjectId;

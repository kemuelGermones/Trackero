import { IProject } from "../types/interface";

// Find Project

const foundProject = (
  projects: IProject[],
  issueId: string
): IProject | null => {
  const project = projects.find(
    (project) =>
      project.issues.findIndex((issue) => issue._id === issueId) !== -1
  );
  return project ? project : null;
};

export default foundProject;

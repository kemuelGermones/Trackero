import { IProject, IModifiedIssue, IIssue } from "./interface";

export function isArrayOfIProject(data: any): data is IProject[] {
  return Array.isArray(data);
}

export function isArrayofIMofifiedIssue(data: any): data is IModifiedIssue[] {
  return Array.isArray(data);
}

export function instanceOfIProject(data: any): data is IProject {
  return data instanceof Object && !Array.isArray(data);
}

export function instanceOfIModifiedIssue(data: any): data is IModifiedIssue {
  return data instanceof Object && !Array.isArray(data);
}

export function instanceOfIIssue(data: any): data is IIssue {
  return data instanceof Object && !Array.isArray(data);
}

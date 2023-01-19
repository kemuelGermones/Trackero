import { IModifiedIssue, IIssue } from "./interface";

export function instanceOfIModifiedIssue(data: any): data is IModifiedIssue {
  return data instanceof Object && !Array.isArray(data);
}

export function instanceOfIIssue(data: any): data is IIssue {
  return data instanceof Object && !Array.isArray(data);
}

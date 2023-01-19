// Project Interface

export interface IProjectData {
  title: string;
  description: string;
}

export interface IProject extends IProjectData {
  _id: string;
  __v: number;
  comments: IComment[];
  issues: IIssue[];
}

export interface IEditProjectData extends IProjectData {
  id: string;
}

// Comment Interface

export interface ICommentData {
  comment: string;
  author: string;
}

export interface IComment {
  _id: string;
  __v: number;
  comment: string;
  author: IUser;
}

// Issue Interface

export interface IIssueData {
  title: string;
  description: string;
  importance: string;
  status: string;
  dueDate: string;
}

export interface IIssue extends IIssueData {
  _id: string;
  __v: number;
  comments: IComment[];
}

export interface IModifiedIssue extends IIssue {
  projectId: string;
  projectName: string;
}

export interface IEditIssueData extends IIssueData {
  projectId: string;
  issueId: string;
}

// User interface

export interface IUserData {
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface IUser {
  _id: string;
  username: string;
  role: string;
}

export interface IRecievedUserData {
  id: string;
  token: string;
  expiresIn: number;
}

// Response Status Interface

export interface IStatus {
  status: number;
  description: string;
}

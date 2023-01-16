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

// Comment Interface

export interface ICommentData {
  comment: string;
}

export interface IComment extends ICommentData {
  _id: string;
  __v: number;
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

// User interface

export interface IUserData {
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface IUser extends IUserData {
  _id: string;
  __v: number;
}

// Response Status Interface

export interface IStatus {
  status: number;
  description: string;
}

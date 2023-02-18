// Project Interface

export interface IProjectFormData {
  title: string;
  description: string;
  assignees: string[];
}

export interface IProject {
  _id: string;
  __v: number;
  title: string;
  description: string;
  assignees: IUser[];
  comments: IComment[];
  issues: IIssue[];
}

// Comment Interface

export interface ICommentFormData {
  comment: string;
}

export interface IComment extends ICommentFormData {
  _id: string;
  __v: number;
  author: IUser;
}

// Issue Interface

export interface IIssueFormData {
  title: string;
  description: string;
  importance: string;
  assignedTo: string;
  dueDate: string;
}

export interface IIssue {
  _id: string;
  __v: number;
  title: string;
  description: string;
  importance: string;
  assignedTo: IUser;
  dueDate: string;
  comments: IComment[];
  author: IUser;
  status: string;
}

// User interface

export interface IUserFormData {
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface IUser {
  _id: string;
  username: string;
  role: string;
  email: string;
}

export interface IUserCredentials {
  id: string;
  email: string;
  username: string;
  role: string;
  token: string;
  expiresIn: number;
}

// Response Data

export interface IResponseData {
  status: number;
  message: string;
}

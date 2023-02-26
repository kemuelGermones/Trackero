// Project Interface

export interface IProjectFormData {
  title: string;
  description: string;
  assignees: IUser[];
}

export interface IProject extends IProjectFormData {
  _id: string;
  __v: number;
  comments: IComment[];
  issues: IIssue[];
}

// Comment Interface

export interface IComment {
  _id: string;
  __v: number;
  comment: string;
  author: IUser;
}

// Issue Interface

export interface IIssueFormData {
  title: string;
  description: string;
  importance: string;
  assignedTo: IUser;
  dueDate: string;
}

export interface IIssue extends IIssueFormData {
  _id: string;
  __v: number;
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

export interface IUserCredentials extends IUser {
  token: string;
  expiresIn: number;
}

// Response Data

export interface IResponseData {
  status: number;
  message: string;
}

export interface IPayloadResponseData<T> extends IResponseData {
  payload: T;
}

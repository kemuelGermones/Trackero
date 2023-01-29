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
  author: IUser;
}

// Issue Interface

export interface IIssueData {
  title: string;
  description: string;
  importance: string;
  dueDate: string;
}

export interface IIssue extends IIssueData {
  _id: string;
  __v: number;
  comments: IComment[];
  author: IUser;
  assignedTo: IUser[];
  status: string;
}

export interface IIssueStatus {
  status: string;
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

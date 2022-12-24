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

// Response Status Interface

export interface IStatus {
  status: number;
  description: string;
}

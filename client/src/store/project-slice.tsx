import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../types/interface";
import { isArrayOfIProject } from "../types/type-guard";

export interface IEditProjectAction {
  id: string;
  title: string;
  description: string;
}

export interface IEditProjectIssueAction {
  projectId: string;
  issueId: string;
  title: string;
  description: string;
  importance: string;
  status: string;
  dueDate: string;
}

interface IDeleteProjectCommentAction {
  projectId: string;
  commentId: string;
}

interface IDeleteProjectIssueAction {
  projectId: string;
  issueId: string;
}

interface IDeleteProjectIssueComment {
  projectId: string;
  issueId: string;
  commentId: string;
}

interface IProjectState {
  data: IProject[] | null;
}

const initialState: IProjectState = {
  data: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // Update Project

    updateProjectsData(state, action: PayloadAction<IProject[]>) {
      state.data = action.payload;
    },

    // Edit Project

    editProjectData(state, action: PayloadAction<IEditProjectAction>) {
      if (isArrayOfIProject(state.data)) {
        const index = state.data.findIndex(
          (project) => project._id === action.payload.id
        );
        state.data[index].title = action.payload.title;
        state.data[index].description = action.payload.description;
      }
    },

    // Delete Project

    deleteProjectData(state, action: PayloadAction<string>) {
      if (isArrayOfIProject(state.data)) {
        state.data = state.data.filter(
          (project) => project._id !== action.payload
        );
      }
    },

    // Delete Project Comment

    deleteProjectCommentData(
      state,
      action: PayloadAction<IDeleteProjectCommentAction>
    ) {
      if (isArrayOfIProject(state.data)) {
        const index = state.data.findIndex(
          (project) => project._id === action.payload.projectId
        );
        state.data[index].comments = state.data[index].comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
      }
    },

    // Edit Project Issue

    editProjectIssue(state, action: PayloadAction<IEditProjectIssueAction>) {
      if (isArrayOfIProject(state.data)) {
        const foundProjectIndex = state.data.findIndex(
          (project) => project._id === action.payload.projectId
        );
        const foundIssueIndex = state.data[foundProjectIndex].issues.findIndex(
          (issue) => issue._id === action.payload.issueId
        );
        state.data[foundProjectIndex].issues[foundIssueIndex].title =
          action.payload.title;
        state.data[foundProjectIndex].issues[foundIssueIndex].description =
          action.payload.description;
        state.data[foundProjectIndex].issues[foundIssueIndex].importance =
          action.payload.importance;
        state.data[foundProjectIndex].issues[foundIssueIndex].status =
          action.payload.status;
        state.data[foundProjectIndex].issues[foundIssueIndex].dueDate =
          action.payload.dueDate;
      }
    },

    // Delete Project Issue

    deleteProjectIssue(
      state,
      action: PayloadAction<IDeleteProjectIssueAction>
    ) {
      if (isArrayOfIProject(state.data)) {
        const foundProjectIndex = state.data.findIndex(
          (project) => project._id === action.payload.projectId
        );
        state.data[foundProjectIndex].issues = state.data[
          foundProjectIndex
        ].issues.filter((issue) => issue._id !== action.payload.issueId);
      }
    },

    // Delete Project Issue Comment

    deleteProjectIssueComment(
      state,
      action: PayloadAction<IDeleteProjectIssueComment>
    ) {
      if (isArrayOfIProject(state.data)) {
        const foundProjectIndex = state.data.findIndex(
          (project) => project._id === action.payload.projectId
        );
        const foundIssueIndex = state.data[foundProjectIndex].issues.findIndex(
          (issue) => issue._id === action.payload.issueId
        );
        state.data[foundProjectIndex].issues[foundIssueIndex].comments =
          state.data[foundProjectIndex].issues[foundIssueIndex].comments.filter(
            (comment) => comment._id !== action.payload.commentId
          );
      }
    },
  },
});

export const {
  updateProjectsData,
  editProjectData,
  deleteProjectData,
  deleteProjectCommentData,
  editProjectIssue,
  deleteProjectIssue,
  deleteProjectIssueComment,
} = projectSlice.actions;

export default projectSlice.reducer;

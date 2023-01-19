import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProject } from "../types/interface";
import { IEditProjectData, IEditIssueData } from "../types/interface";

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

interface IDataState {
  projectsData: IProject[] | null;
}

const initialState: IDataState = {
  projectsData: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // Update Project

    updateProjectsData(state, action: PayloadAction<IProject[]>) {
      state.projectsData = action.payload;
    },

    // Edit Project

    editProjectData(state, action: PayloadAction<IEditProjectData>) {
      if (!!state.projectsData) {
        const index = state.projectsData.findIndex(
          (project) => project._id === action.payload.id
        );
        state.projectsData[index].title = action.payload.title;
        state.projectsData[index].description = action.payload.description;
      }
    },

    // Delete Project

    deleteProjectData(state, action: PayloadAction<string>) {
      if (!!state.projectsData) {
        state.projectsData = state.projectsData.filter(
          (project) => project._id !== action.payload
        );
      }
    },

    // Delete Project Comment

    deleteProjectCommentData(
      state,
      action: PayloadAction<IDeleteProjectCommentAction>
    ) {
      if (!!state.projectsData) {
        const index = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        state.projectsData[index].comments = state.projectsData[index].comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
      }
    },

    // Edit Project Issue

    editProjectIssue(state, action: PayloadAction<IEditIssueData>) {
      if (!!state.projectsData) {
        const foundProjectIndex = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        const foundIssueIndex = state.projectsData[foundProjectIndex].issues.findIndex(
          (issue) => issue._id === action.payload.issueId
        );
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].title =
          action.payload.title;
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].description =
          action.payload.description;
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].importance =
          action.payload.importance;
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].status =
          action.payload.status;
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].dueDate =
          action.payload.dueDate;
      }
    },

    // Delete Project Issue

    deleteProjectIssue(
      state,
      action: PayloadAction<IDeleteProjectIssueAction>
    ) {
      if (!!state.projectsData) {
        const foundProjectIndex = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        state.projectsData[foundProjectIndex].issues = state.projectsData[
          foundProjectIndex
        ].issues.filter((issue) => issue._id !== action.payload.issueId);
      }
    },

    // Delete Project Issue Comment

    deleteProjectIssueComment(
      state,
      action: PayloadAction<IDeleteProjectIssueComment>
    ) {
      if (!!state.projectsData) {
        const foundProjectIndex = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        const foundIssueIndex = state.projectsData[foundProjectIndex].issues.findIndex(
          (issue) => issue._id === action.payload.issueId
        );
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].comments =
          state.projectsData[foundProjectIndex].issues[foundIssueIndex].comments.filter(
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

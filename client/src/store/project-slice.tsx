import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProject } from "../types/interface";
import { IIssueData, IProjectData } from "../types/interface";

interface IDataId {
  projectId: string;
  issueId: string;
}

interface IDataState {
  projectsData: IProject[] | null;
}

interface IEditProjectAction extends IProjectData {
  projectId: string;
}

interface IDeleteProjectCommentAction {
  projectId: string;
  commentId: string;
}

interface IDeleteProjectIssueCommentAction extends IDataId {
  commentId: string;
}

type TEditIssueDataAction = IDataId & IIssueData;

type TUpdateIssueStatusAction = IDataId & { status: string };

const initialState: IDataState = {
  projectsData: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // Save Project Data

    updateProjectsData(state, action: PayloadAction<IProject[]>) {
      state.projectsData = action.payload;
    },

    // Clear Project Data

    clearProjectsData(state) {
      state.projectsData = null;
    },

    // Edit Project

    editProjectData(state, action: PayloadAction<IEditProjectAction>) {
      if (state.projectsData) {
        const index = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        state.projectsData[index].title = action.payload.title;
        state.projectsData[index].description = action.payload.description;
      }
    },

    // Delete Project

    deleteProjectData(state, action: PayloadAction<string>) {
      if (state.projectsData) {
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
      if (state.projectsData) {
        const index = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        state.projectsData[index].comments = state.projectsData[
          index
        ].comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
      }
    },

    // Edit Project Issue

    editProjectIssue(state, action: PayloadAction<TEditIssueDataAction>) {
      if (state.projectsData) {
        const foundProjectIndex = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        const foundIssueIndex = state.projectsData[
          foundProjectIndex
        ].issues.findIndex((issue) => issue._id === action.payload.issueId);
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].title =
          action.payload.title;
        state.projectsData[foundProjectIndex].issues[
          foundIssueIndex
        ].description = action.payload.description;
        state.projectsData[foundProjectIndex].issues[
          foundIssueIndex
        ].importance = action.payload.importance;
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].dueDate =
          action.payload.dueDate;
      }
    },

    // Delete Project Issue

    deleteProjectIssue(state, action: PayloadAction<IDataId>) {
      if (state.projectsData) {
        const foundProjectIndex = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        state.projectsData[foundProjectIndex].issues = state.projectsData[
          foundProjectIndex
        ].issues.filter((issue) => issue._id !== action.payload.issueId);
      }
    },

    //  Update Project issue status

    updateProjectIssueStatus(
      state,
      action: PayloadAction<TUpdateIssueStatusAction>
    ) {
      if (state.projectsData) {
        const foundProjectIndex = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        const foundIssueIndex = state.projectsData[
          foundProjectIndex
        ].issues.findIndex((issue) => issue._id === action.payload.issueId);
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].status =
          action.payload.status;
      }
    },

    //Update Project issue assigned users

    updateProjectIssueAssignedTo(state, action) {
      if (state.projectsData) {
        const foundProjectIndex = state.projectsData.findIndex(
          (state) => state._id === action.payload.projectId
        );
        const foundIssueIndex = state.projectsData[
          foundProjectIndex
        ].issues.findIndex((issue) => issue._id === action.payload.issueId);
        state.projectsData[foundProjectIndex].issues[
          foundIssueIndex
        ].assignedTo = action.payload.assignedTo;
      }
    },

    // Delete Project Issue Comment

    deleteProjectIssueComment(
      state,
      action: PayloadAction<IDeleteProjectIssueCommentAction>
    ) {
      if (state.projectsData) {
        const foundProjectIndex = state.projectsData.findIndex(
          (project) => project._id === action.payload.projectId
        );
        const foundIssueIndex = state.projectsData[
          foundProjectIndex
        ].issues.findIndex((issue) => issue._id === action.payload.issueId);
        state.projectsData[foundProjectIndex].issues[foundIssueIndex].comments =
          state.projectsData[foundProjectIndex].issues[
            foundIssueIndex
          ].comments.filter(
            (comment) => comment._id !== action.payload.commentId
          );
      }
    },
  },
});

export const {
  updateProjectsData,
  clearProjectsData,
  editProjectData,
  deleteProjectData,
  updateProjectIssueStatus,
  updateProjectIssueAssignedTo,
  deleteProjectCommentData,
  editProjectIssue,
  deleteProjectIssue,
  deleteProjectIssueComment,
} = projectSlice.actions;

export default projectSlice.reducer;

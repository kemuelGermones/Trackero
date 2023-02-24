import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import updateDataUsername from "../lib/updateDataUsername";
import {
  ICommentId,
  IIssueFormData,
  IIssueId,
  IProject,
  IProjectFormData,
  IProjectId,
} from "../types/interface";
import { IUpdateUsername } from "./user-list-slice";

interface IProjectSliceState {
  projectsData: IProject[] | null;
}

interface IEditProject extends IProjectId, IProjectFormData {}

interface IDeleteProjectComment extends IProjectId, ICommentId {}

interface IEditIssue extends IProjectId, IIssueId, IIssueFormData {}

interface IDeleteIssue extends IProjectId, IIssueId {}

interface IUpdateIssueStatus extends IProjectId, IIssueId {
  status: string;
}

interface IDeleteIssueComment extends IProjectId, IIssueId, ICommentId {}

const initialState: IProjectSliceState = {
  projectsData: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // Save Projects Data

    updateProjects(state, action: PayloadAction<IProject[]>) {
      state.projectsData = action.payload;
    },

    // Clear Projects Data

    clearProjects(state) {
      state.projectsData = null;
    },

    // Edit Project

    editProject(state, action: PayloadAction<IEditProject>) {
      const index = state.projectsData!.findIndex(
        (project) => project._id === action.payload.projectId
      );
      state.projectsData![index].title = action.payload.title;
      state.projectsData![index].description = action.payload.description;
      state.projectsData![index].assignees = action.payload.assignees;
    },

    // Delete Project

    deleteProject(state, action: PayloadAction<string>) {
      state.projectsData = state.projectsData!.filter(
        (project) => project._id !== action.payload
      );
    },

    // Delete Project Comment

    deleteProjectComment(state, action: PayloadAction<IDeleteProjectComment>) {
      const index = state.projectsData!.findIndex(
        (project) => project._id === action.payload.projectId
      );
      state.projectsData![index].comments = state.projectsData![
        index
      ].comments.filter((comment) => comment._id !== action.payload.commentId);
    },

    // Edit Project Issue

    editIssue(state, action: PayloadAction<IEditIssue>) {
      const projectIndex = state.projectsData!.findIndex(
        (project) => project._id === action.payload.projectId
      );
      const issueIndex = state.projectsData![projectIndex].issues.findIndex(
        (issue) => issue._id === action.payload.issueId
      );
      state.projectsData![projectIndex].issues[issueIndex].title =
        action.payload.title;
      state.projectsData![projectIndex].issues[issueIndex].description =
        action.payload.description;
      state.projectsData![projectIndex].issues[issueIndex].importance =
        action.payload.importance;
      state.projectsData![projectIndex].issues[issueIndex].assignedTo =
        action.payload.assignedTo;
      state.projectsData![projectIndex].issues[issueIndex].dueDate =
        action.payload.dueDate;
    },

    // Delete Project Issue

    deleteIssue(state, action: PayloadAction<IDeleteIssue>) {
      const projectIndex = state.projectsData!.findIndex(
        (project) => project._id === action.payload.projectId
      );
      state.projectsData![projectIndex].issues = state.projectsData![
        projectIndex
      ].issues.filter((issue) => issue._id !== action.payload.issueId);
    },

    // Update Project Issue Status

    updateIssueStatus(state, action: PayloadAction<IUpdateIssueStatus>) {
      const projectIndex = state.projectsData!.findIndex(
        (project) => project._id === action.payload.projectId
      );
      const issueIndex = state.projectsData![projectIndex].issues.findIndex(
        (issue) => issue._id === action.payload.issueId
      );
      state.projectsData![projectIndex].issues[issueIndex].status =
        action.payload.status;
    },

    // Delete Project Issue Comment

    deleteIssueComment(state, action: PayloadAction<IDeleteIssueComment>) {
      const projectIndex = state.projectsData!.findIndex(
        (project) => project._id === action.payload.projectId
      );
      const issueIndex = state.projectsData![projectIndex].issues.findIndex(
        (issue) => issue._id === action.payload.issueId
      );
      state.projectsData![projectIndex].issues[issueIndex].comments =
        state.projectsData![projectIndex].issues[issueIndex].comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
    },

    // Update Projects Data Username

    updateProjectsUsername(state, action: PayloadAction<IUpdateUsername>) {
      updateDataUsername(
        state.projectsData!,
        action.payload.userId,
        action.payload.username
      );
    },
  },
});

export const {
  updateProjects,
  clearProjects,
  deleteProject,
  editProject,
  deleteProjectComment,
  editIssue,
  deleteIssue,
  updateIssueStatus,
  deleteIssueComment,
  updateProjectsUsername,
} = projectSlice.actions;

export default projectSlice.reducer;

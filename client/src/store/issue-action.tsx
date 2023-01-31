import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import {
  updateProjectsData,
  editProjectIssue,
  deleteProjectIssue,
  deleteProjectIssueComment,
  updateProjectIssueStatus,
  updateProjectIssueAssignedTo,
} from "./project-slice";
import showNotification from "./notification-action";
import { showLoading, hideLoading } from "./loading-slice";

import {
  IProject,
  IIssueData,
  ICommentData,
  IUser,
} from "../types/interface";
import { RootState, ThunkAction } from ".";

// Add issue

export const addIssue = (
  data: IIssueData,
  projectId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios({
        method: "post",
        url: `http://localhost:5000/projects/${projectId}/issues`,
        data,
        headers: {
          Authorization: token,
        },
      });
      const getResponse = await axios<IProject[]>({
        method: "get",
        url: "http://localhost:5000/projects",
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(getResponse.data));
      dispatch(hideLoading());
      dispatch(showNotification("success", postResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Edit issue

export const editIssue = (
  data: IIssueData,
  projectId: string,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const putResponse = await axios({
        method: "put",
        url: `http://localhost:5000/projects/${projectId}/issues/${issueId}`,
        data,
        headers: {
          Authorization: token,
        },
      });
      dispatch(
        editProjectIssue({
          ...data,
          projectId,
          issueId,
        })
      );
      dispatch(hideLoading());
      dispatch(showNotification("success", putResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Delete issue

export const deleteIssue = (
  projectId: string,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const deleteResponse = await axios({
        method: "delete",
        url: `http://localhost:5000/projects/${projectId}/issues/${issueId}`,
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteProjectIssue({ projectId, issueId }));
      dispatch(hideLoading());
      dispatch(showNotification("success", deleteResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Update issue status

export const updateIssueStatus = (
  data: { status: string },
  projectId: string,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const patchResponse = await axios({
        method: "patch",
        url: `http://localhost:5000/projects/${projectId}/issues/${issueId}/status`,
        data,
        headers: {
          Authorization: token,
        },
      });
      dispatch(
        updateProjectIssueStatus({ status: data.status, projectId, issueId })
      );
      dispatch(hideLoading());
      dispatch(showNotification("success", patchResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Update issue assignedTo

export const updateIssueAssignedTo = (
  data: IUser[],
  projectId: string,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const patchResponse = await axios({
        method: "patch",
        url: `http://localhost:5000/projects/${projectId}/issues/${issueId}/assignedTo`,
        data: { assignedTo: data.map((user) => user._id) },
        headers: {
          Authorization: token,
        },
      });
      dispatch(
        updateProjectIssueAssignedTo({ assignedTo: data, projectId, issueId })
      );
      dispatch(hideLoading());
      dispatch(showNotification("success", patchResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Add issue comment

export const addIssueComment = (
  data: ICommentData,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios({
        method: "post",
        url: `http://localhost:5000/issues/${issueId}/comments`,
        data: data,
        headers: {
          Authorization: token,
        },
      });
      const getResponse = await axios<IProject[]>({
        method: "get",
        url: "http://localhost:5000/projects",
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(getResponse.data));
      dispatch(hideLoading());
      dispatch(showNotification("success", postResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Delete issue comment

export const deleteIssueComment = (
  projectId: string,
  issueId: string,
  commentId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const deleteResponse = await axios({
        method: "delete",
        url: `http://localhost:5000/issues/${issueId}/comments/${commentId}`,
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteProjectIssueComment({ projectId, issueId, commentId }));
      dispatch(hideLoading());
      dispatch(showNotification("success", deleteResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

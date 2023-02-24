import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { RootState, ThunkAction } from ".";
import { IIssueFormData, IProjectResponseData } from "../types/interface";
import {
  deleteIssue,
  deleteIssueComment,
  editIssue,
  updateIssueStatus,
  updateProjects,
} from "./project-slice";

const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Add Issue

export const addIssueRequest = (
  data: IIssueFormData,
  projectId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: `${URL}/projects/${projectId}/issues`,
        data: { ...data, assignedTo: data.assignedTo._id },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateProjects(postResponse.data.payload));
      toast.dismiss(loadingToast);
      toast.success(postResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

// Edit Issue

export const editIssueRequest = (
  data: IIssueFormData,
  projectId: string,
  issueId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const putResponse = await axios<IProjectResponseData>({
        method: "put",
        url: `${URL}/projects/${projectId}/issues/${issueId}`,
        data: { ...data, assignedTo: data.assignedTo._id },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(editIssue({ ...data, projectId, issueId }));
      toast.dismiss(loadingToast);
      toast.success(putResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

// Delete Issue

export const deleteIssueRequest = (
  projectId: string,
  issueId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const deleteResponse = await axios<IProjectResponseData>({
        method: "delete",
        url: `${URL}/projects/${projectId}/issues/${issueId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(deleteIssue({ projectId, issueId }));
      toast.dismiss(loadingToast);
      toast.success(deleteResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

// Update Issue Status

export const updateIssueStatusRequest = (
  status: string,
  projectId: string,
  issueId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const patchResponse = await axios<IProjectResponseData>({
        method: "patch",
        url: `${URL}/projects/${projectId}/issues/${issueId}/status`,
        data: { status },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateIssueStatus({ status, projectId, issueId }));
      toast.dismiss(loadingToast);
      toast.success(patchResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

// Add Issue Comment

export const addIssueCommentRequest = (
  comment: string,
  issueId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: `${URL}/issues/${issueId}/comments`,
        data: { comment },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateProjects(postResponse.data.payload));
      toast.dismiss(loadingToast);
      toast.success(postResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

// Delete Issue Comment

export const deleteIssueCommentRequest = (
  projectId: string,
  issueId: string,
  commentId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const deleteResponse = await axios<IProjectResponseData>({
        method: "delete",
        url: `${URL}/issues/${issueId}/comments/${commentId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(deleteIssueComment({ projectId, issueId, commentId }));
      toast.dismiss(loadingToast);
      toast.success(deleteResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

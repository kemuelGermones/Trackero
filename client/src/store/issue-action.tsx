import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { RootState, ThunkAction } from ".";
import { ICommentFormData, IIssueFormData } from "../types/interface";
import { IProjectResponseData } from "./project-action";
import { updateProjectsData } from "./project-slice";

// Add Issue

export const addIssue = (
  data: IIssueFormData,
  projectId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: `http://localhost:5000/projects/${projectId}/issues`,
        data,
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(postResponse.data.payload));
      toast.success(postResponse.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Edit Issue

export const editIssue = (
  data: IIssueFormData,
  projectId: string,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    // dispatch(showLoading());
    try {
      const putResponse = await axios<IProjectResponseData>({
        method: "put",
        url: `http://localhost:5000/projects/${projectId}/issues/${issueId}`,
        data,
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(putResponse.data.payload));
      toast.success(putResponse.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Delete Issue

export const deleteIssue = (
  projectId: string,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    // dispatch(showLoading());
    try {
      const deleteResponse = await axios<IProjectResponseData>({
        method: "delete",
        url: `http://localhost:5000/projects/${projectId}/issues/${issueId}`,
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(deleteResponse.data.payload));
      toast.success(deleteResponse.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Update Issue Status

export const updateIssueStatus = (
  data: { status: string },
  projectId: string,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const patchResponse = await axios<IProjectResponseData>({
        method: "patch",
        url: `http://localhost:5000/projects/${projectId}/issues/${issueId}/status`,
        data,
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(patchResponse.data.payload));
      toast.success(patchResponse.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Add Issue Comment

export const addIssueComment = (
  data: ICommentFormData,
  issueId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    // dispatch(showLoading());
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: `http://localhost:5000/issues/${issueId}/comments`,
        data: data,
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(postResponse.data.payload));
      toast.success(postResponse.data.message);
      // dispatch(hideLoading());
      // dispatch(showNotification("success", postResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Delete Issue Comment

export const deleteIssueComment = (
  issueId: string,
  commentId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    // dispatch(showLoading());
    try {
      const deleteResponse = await axios<IProjectResponseData>({
        method: "delete",
        url: `http://localhost:5000/issues/${issueId}/comments/${commentId}`,
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(deleteResponse.data.payload));
      toast.success(deleteResponse.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { RootState, ThunkAction } from ".";
import {
  IIssueFormData,
  IPayloadResponseData,
  IProject,
  IResponseData,
} from "../types/interface";
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
    try {
      const postResponse = await axios<IPayloadResponseData<IProject[]>>({
        method: "post",
        url: `${URL}/projects/${projectId}/issues`,
        data: { ...data, assignedTo: data.assignedTo._id },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateProjects(postResponse.data.payload));
      toast.success(postResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
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
    try {
      const putResponse = await axios<IResponseData>({
        method: "put",
        url: `${URL}/projects/${projectId}/issues/${issueId}`,
        data: { ...data, assignedTo: data.assignedTo._id },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(editIssue({ ...data, projectId, issueId }));
      toast.success(putResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

// Delete Issue

export const deleteIssueRequest = (
  projectId: string,
  issueId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const deleteResponse = await axios<IResponseData>({
        method: "delete",
        url: `${URL}/projects/${projectId}/issues/${issueId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(deleteIssue({ projectId, issueId }));
      toast.success(deleteResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
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
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `${URL}/projects/${projectId}/issues/${issueId}/status`,
        data: { status },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateIssueStatus({ status, projectId, issueId }));
      toast.success(patchResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

// Add Issue Comment

export const addIssueCommentRequest = (
  comment: string,
  issueId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const postResponse = await axios<IPayloadResponseData<IProject[]>>({
        method: "post",
        url: `${URL}/issues/${issueId}/comments`,
        data: { comment },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateProjects(postResponse.data.payload));
      toast.success(postResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
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
    try {
      const deleteResponse = await axios<IResponseData>({
        method: "delete",
        url: `${URL}/issues/${issueId}/comments/${commentId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(deleteIssueComment({ projectId, issueId, commentId }));
      toast.success(deleteResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

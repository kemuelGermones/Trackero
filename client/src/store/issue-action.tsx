import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import {
  updateProjectsData,
  editProjectIssue,
  deleteProjectIssue,
  deleteProjectIssueComment,
} from "./project-slice";
import showNotification from "./notification-action";
import { showLoading, hideLoading } from "./loading-slice";
import { IIssueData, IProject } from "../types/interface";
import { IEditProjectIssueAction } from "./project-slice";
import { RootState, ThunkAction } from ".";

// Add issue

export const addIssue = (
  projectId: string,
  data: IIssueData,
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
  data: IEditProjectIssueAction,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const putResponse = await axios({
        method: "put",
        url: `http://localhost:5000/projects/${data.projectId}/issues/${data.issueId}`,
        data: {
          title: data.title,
          description: data.description,
          importance: data.importance,
          status: data.status,
          dueDate: data.dueDate,
        },
        headers: {
          Authorization: token,
        },
      });
      dispatch(editProjectIssue(data));
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

export const addIssueComment = (
  issueId: string,
  comment: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios({
        method: "post",
        url: `http://localhost:5000/issues/${issueId}/comments`,
        data: { comment },
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

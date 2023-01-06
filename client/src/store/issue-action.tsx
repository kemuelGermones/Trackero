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
  data: IIssueData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post(
        `http://localhost:5000/projects/${projectId}/issues`,
        data
      );
      const getResponse = await axios.get<IProject[]>(
        "http://localhost:5000/projects"
      );
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
  data: IEditProjectIssueAction
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const putResponse = await axios.put(
        `http://localhost:5000/projects/${data.projectId}/issues/${data.issueId}`,
        {
          title: data.title,
          description: data.description,
          importance: data.importance,
          status: data.status,
          dueDate: data.dueDate,
        }
      );
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
  issueId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/projects/${projectId}/issues/${issueId}`
      );
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
  comment: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post(
        `http://localhost:5000/issues/${issueId}/comments`,
        { comment }
      );
      const getResponse = await axios.get<IProject[]>(
        "http://localhost:5000/projects"
      );
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
  commentId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/issues/${issueId}/comments/${commentId}`
      );
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

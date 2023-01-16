import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import {
  updateProjectsData,
  editProjectData,
  deleteProjectData,
  deleteProjectCommentData,
} from "./project-slice";
import showNotification from "./notification-action";
import { showLoading, hideLoading } from "./loading-slice";
import { RootState, ThunkAction } from "./index";
import { IProject, IProjectData } from "../types/interface";
import { IEditProjectAction } from "./project-slice";

// Get all projects

export const getProjects = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await axios.get<IProject[]>(
        "http://localhost:5000/projects"
      );
      dispatch(updateProjectsData(response.data));
      dispatch(hideLoading());
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Add project

export const addProject = (
  data: IProjectData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post(
        "http://localhost:5000/projects",
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

// Edit project

export const editProject = (
  data: IEditProjectAction
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const putResponse = await axios.put(
        `http://localhost:5000/projects/${data.id}`,
        { title: data.title, description: data.description }
      );
      dispatch(editProjectData(data));
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

// Delete project

export const deleteProject = (
  id: string
): ThunkAction<Promise<number>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/projects/${id}`
      );
      dispatch(deleteProjectData(id));
      dispatch(hideLoading());
      dispatch(showNotification("success", deleteResponse.data.message));
      return deleteResponse.data.status;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
      return 400;
    }
  };
};

// Add comment to the project

export const addProjectComment = (
  id: string,
  comment: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post(
        `http://localhost:5000/projects/${id}/comments`,
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

// Delete project comment

export const deleteProjectComment = (
  projectId: string,
  commentId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/projects/${projectId}/comments/${commentId}`
      );
      dispatch(deleteProjectCommentData({ projectId, commentId }));
      dispatch(hideLoading());
      dispatch(showNotification("success", deleteResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
        return error.response?.data.status;
      }
    }
  };
};

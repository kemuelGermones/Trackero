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

export const getProjects = (
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await axios<IProject[]>({
        method: "get",
        url: "http://localhost:5000/projects",
        headers: {
          Authorization: token,
        },
      });
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
  data: IProjectData,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios({
        method: "post",
        url: "http://localhost:5000/projects",
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

// Edit project

export const editProject = (
  data: IEditProjectAction,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const putResponse = await axios({
        method: "put",
        url: `http://localhost:5000/projects/${data.id}`,
        data: { title: data.title, description: data.description },
        headers: {
          Authorization: token,
        },
      });
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
  id: string,
  token: string
): ThunkAction<Promise<number>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const deleteResponse = await axios({
        method: "delete",
        url: `http://localhost:5000/projects/${id}`,
        headers: {
          Authorization: token,
        },
      });
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
  comment: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios({
        method: "post",
        url: `http://localhost:5000/projects/${id}/comments`,
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

// Delete project comment

export const deleteProjectComment = (
  projectId: string,
  commentId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const deleteResponse = await axios({
        method: "delete",
        url: `http://localhost:5000/projects/${projectId}/comments/${commentId}`,
        headers: {
          Authorization: token,
        },
      });
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

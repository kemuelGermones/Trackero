import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import {
  ICommentFormData,
  IProject,
  IProjectFormData,
  IResponseData,
} from "../types/interface";
import { RootState, ThunkAction } from "./index";
import { updateProjectsData } from "./project-slice";

export interface IProjectResponseData extends IResponseData {
  payload: IProject[];
}

const URL = "http://localhost:5000";

// Get Projects

export const getProjects = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const getResponse = await axios<IProjectResponseData>({
        method: "get",
        url: `${URL}/projects`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateProjectsData(getResponse.data.payload));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Add Project

export const addProject = (
  data: IProjectFormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: `${URL}/projects`,
        data,
        headers: {
          Authorization: state.user.accessToken,
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

// Edit Project

export const editProject = (
  data: IProjectFormData,
  projectId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const putResponse = await axios<IProjectResponseData>({
        method: "put",
        url: `${URL}/projects/${projectId}`,
        data,
        headers: {
          Authorization: state.user.accessToken,
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

// Delete Project

export const deleteProject = (
  projectId: string
): ThunkAction<Promise<number>, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const deleteResponse = await axios<IProjectResponseData>({
        method: "delete",
        url: `${URL}/projects/${projectId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateProjectsData(deleteResponse.data.payload));
      toast.success(deleteResponse.data.message);
      return deleteResponse.data.status;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
      return 400;
    }
  };
};

// Add Comment to the Project

export const addProjectComment = (
  data: ICommentFormData,
  projectId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: `${URL}/projects/${projectId}/comments`,
        data,
        headers: {
          Authorization: state.user.accessToken,
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

// Delete Project Comment

export const deleteProjectComment = (
  projectId: string,
  commentId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const deleteResponse = await axios<IProjectResponseData>({
        method: "delete",
        url: `${URL}/projects/${projectId}/comments/${commentId}`,
        headers: {
          Authorization: state.user.accessToken,
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

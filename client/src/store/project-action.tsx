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

// Add Project

export const addProject = (
  data: IProjectFormData,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: "http://localhost:5000/projects",
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

// Edit Project

export const editProject = (
  data: IProjectFormData,
  projectId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const putResponse = await axios<IProjectResponseData>({
        method: "put",
        url: `http://localhost:5000/projects/${projectId}`,
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

// Delete Project

export const deleteProject = (
  projectId: string,
  token: string
): ThunkAction<Promise<number>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const deleteResponse = await axios<IProjectResponseData>({
        method: "delete",
        url: `http://localhost:5000/projects/${projectId}`,
        headers: {
          Authorization: token,
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
  projectId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: `http://localhost:5000/projects/${projectId}/comments`,
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

// Delete Project Comment

export const deleteProjectComment = (
  projectId: string,
  commentId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const deleteResponse = await axios<IProjectResponseData>({
        method: "delete",
        url: `http://localhost:5000/projects/${projectId}/comments/${commentId}`,
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

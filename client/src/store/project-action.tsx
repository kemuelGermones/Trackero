import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { RootState, ThunkAction } from ".";
import {
  IPayloadResponseData,
  IProject,
  IProjectFormData,
  IResponseData,
} from "../types/interface";
import {
  deleteProject,
  deleteProjectComment,
  editProject,
  updateProjects,
} from "./project-slice";

const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get Projects

export const getProjectsRequest = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const getProjectsResponse = await axios<IPayloadResponseData<IProject[]>>(
        {
          method: "get",
          url: `${URL}/projects`,
          headers: {
            Authorization: state.user.accessToken,
          },
        }
      );
      dispatch(updateProjects(getProjectsResponse.data.payload));
    } catch (e) {}
  };
};

// Add Project

export const addProjectRequest = (
  data: IProjectFormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const postResponse = await axios<IPayloadResponseData<IProject[]>>({
        method: "post",
        url: `${URL}/projects`,
        data: {
          ...data,
          assignees: data.assignees.map((assignee) => assignee._id),
        },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateProjects(postResponse.data.payload));
      toast.success(postResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

// Edit Project

export const editProjectRequest = (
  data: IProjectFormData,
  projectId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const putResponse = await axios<IResponseData>({
        method: "put",
        url: `${URL}/projects/${projectId}`,
        data: {
          ...data,
          assignees: data.assignees.map((assignee) => assignee._id),
        },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(editProject({ ...data, projectId }));
      toast.success(putResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

// Delete Project

export const deleteProjectRequest = (
  projectId: string
): ThunkAction<Promise<number>, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const deleteResponse = await axios<IResponseData>({
        method: "delete",
        url: `${URL}/projects/${projectId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(deleteProject(projectId));
      toast.success(deleteResponse.data.message, { containerId: "bottom" });
      return deleteResponse.data.status;
    } catch (e) {
      return 400;
    }
  };
};

// Add Project Comment

export const addProjectCommentRequest = (
  comment: string,
  projectId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const postResponse = await axios<IPayloadResponseData<IProject[]>>({
        method: "post",
        url: `${URL}/projects/${projectId}/comments`,
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

// Delete Project Comment

export const deleteProjectCommentRequest = (
  projectId: string,
  commentId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const deleteResponse = await axios<IResponseData>({
        method: "delete",
        url: `${URL}/projects/${projectId}/comments/${commentId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(deleteProjectComment({ projectId, commentId }));
      toast.success(deleteResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

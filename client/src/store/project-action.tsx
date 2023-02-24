import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import {
  IProject,
  IProjectFormData,
  IProjectResponseData,
  IResponseData,
} from "../types/interface";
import { RootState, ThunkAction } from "./index";
import {
  deleteProject,
  deleteProjectComment,
  editProject,
  updateProjects,
} from "./project-slice";
import { updateUsers } from "./user-list-slice";

const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get Data

export const getDataRequest = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      if (state.user.userRole === "Administrator") {
        const [getProjectsResponse, getUsersResponse] = await axios.all([
          axios({
            method: "get",
            url: `${URL}/projects`,
            headers: {
              Authorization: state.user.accessToken,
            },
          }),
          axios({
            method: "get",
            url: `${URL}/users`,
            headers: {
              Authorization: state.user.accessToken,
            },
          }),
        ]);
        dispatch(updateProjects(getProjectsResponse.data));
        dispatch(updateUsers(getUsersResponse.data));
      } else {
        const getProjectsResponse = await axios<IProject[]>({
          method: "get",
          url: `${URL}/projects`,
          headers: {
            Authorization: state.user.accessToken,
          },
        });
        dispatch(updateProjects(getProjectsResponse.data));
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

// Add Project

export const addProjectRequest = (
  data: IProjectFormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const postResponse = await axios<IProjectResponseData>({
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

// Edit Project

export const editProjectRequest = (
  data: IProjectFormData,
  projectId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
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

// Delete Project

export const deleteProjectRequest = (
  projectId: string
): ThunkAction<Promise<number>, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const deleteResponse = await axios<IResponseData>({
        method: "delete",
        url: `${URL}/projects/${projectId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(deleteProject(projectId));
      toast.dismiss(loadingToast);
      toast.success(deleteResponse.data.message, {
        containerId: "notification",
      });
      return deleteResponse.data.status;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
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
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const postResponse = await axios<IProjectResponseData>({
        method: "post",
        url: `${URL}/projects/${projectId}/comments`,
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

// Delete Project Comment

export const deleteProjectCommentRequest = (
  projectId: string,
  commentId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const deleteResponse = await axios<IResponseData>({
        method: "delete",
        url: `${URL}/projects/${projectId}/comments/${commentId}`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(deleteProjectComment({ projectId, commentId }));
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

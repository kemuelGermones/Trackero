import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { IProject, IResponseData, IUser } from "../types/interface";
import { RootState, ThunkAction } from "./index";
import { updateProjectsData } from "./project-slice";
import { updateUsersData } from "./user-list-slice";

export interface IGetDataResponse extends IResponseData {
  payload: {
    projects: IProject[];
    users: IUser[];
  };
}

// Get Projects Data and Users Data

export const getData = (
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const getResponse = await axios<IGetDataResponse>({
        method: "get",
        url: "http://localhost:5000/data",
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(getResponse.data.payload.projects));
      dispatch(updateUsersData(getResponse.data.payload.users));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

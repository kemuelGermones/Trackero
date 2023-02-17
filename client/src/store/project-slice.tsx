import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IProject } from "../types/interface";

interface IDataState {
  projectsData: IProject[] | null;
}

const initialState: IDataState = {
  projectsData: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // Save Project Data

    updateProjectsData(state, action: PayloadAction<IProject[]>) {
      state.projectsData = action.payload;
    },

    // Clear Project Data

    clearProjectsData(state) {
      state.projectsData = null;
    },
  },
});

export const { updateProjectsData, clearProjectsData } = projectSlice.actions;

export default projectSlice.reducer;

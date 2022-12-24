import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { show: false },
  reducers: {
    // Show Loading

    showLoading(state) {
      state.show = true;
    },

    // Hide Loading

    hideLoading(state) {
      state.show = false;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isAdmin: true,
  },
  reducers: {
    toggleUserRole: (state) => {
      state.isAdmin = !state.isAdmin;
    },
  },
});

export const { toggleUserRole } = uiSlice.actions;
export default uiSlice.reducer;

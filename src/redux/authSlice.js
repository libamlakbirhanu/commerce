import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  firstEntrance: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, payload) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.user = { ...payload.payload, role: "admin" };
    },
    logout: (state) => {
      state.user = null;
    },
    switchFirstEntrance: (state) => {
      state.firstEntrance = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authLogin, switchFirstEntrance, logout } = authSlice.actions;

export default authSlice.reducer;

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
      state.user = { ...payload.payload };
    },
    addRole: (state, payload) => {
      console.log(payload);
      // state.user.roles = [...state.user.roles, payload]
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
export const { authLogin, addRole, switchFirstEntrance, logout } = authSlice.actions;

export default authSlice.reducer;

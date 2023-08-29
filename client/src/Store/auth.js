import { createSlice } from "@reduxjs/toolkit";

const initial = {
  token: localStorage.getItem("token"),
  userID: localStorage.getItem("userID"),
};

const authStore = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    login(state, action) {
      state.userID = action.payload.userID;
      state.token = action.payload.token;

      localStorage.setItem("token", state.token);
      localStorage.setItem("userID", state.userID);
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
    },
  },
});

export default authStore;

export const { login, logout } = authStore.actions;

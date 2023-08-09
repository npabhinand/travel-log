// auth
import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: localStorage.getItem("isLoggedIn") === "true" },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true"); // Update local storage
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false"); // Update local storage
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({ reducer: authSlice.reducer });

import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbar.slice";
import userReducer from "./user.slice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    user: userReducer
  },
});
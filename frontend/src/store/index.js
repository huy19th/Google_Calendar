import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "../store/snackbar.slice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});
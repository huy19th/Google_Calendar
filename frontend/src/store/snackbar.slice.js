import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    severity: "",
    message: ""
}

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.show = true;
            state.severity = action.payload.severity;
            state.message = action.payload.message;
        },
        closeSnackbar: (state) => {
            state.show = false;
        }
    }
})

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
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
        show: (state, action) => {
            state.show = true;
            state.severity = action.payload.severity;
            state.message = action.payload.message;
        },
        close: (state) => {
            state.show = false;
        }
    }
})

export const { show, close } = snackbarSlice.actions;

export default snackbarSlice.reducer;
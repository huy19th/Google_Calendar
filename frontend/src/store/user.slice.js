import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.show = true;
            state.severity = action.payload.severity;
            state.message = action.payload.message;
        },
        login: (state, action) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
        logout: state => {
            state.currentUser = null;
            state.isLoggedIn = false;
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
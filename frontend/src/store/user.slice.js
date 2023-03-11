import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoggedIn: false,
    users: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
        logout: state => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    }
})

export const { login, logout, setUsers } = userSlice.actions;

export default userSlice.reducer;
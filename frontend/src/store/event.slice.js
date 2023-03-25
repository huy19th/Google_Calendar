import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
    thisMonth: [],
    nextMonth: []
}

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload
        },
        setThisMonth: (state) => {
            let today = new Date();
            let month = today.getMonth();
            let year = today.getFullYear();
            state.thisMonth = state.events.filter(item => {
                return item.start.getMonth() === month && item.start.getFullYear() === year;
            });
        },
        setNextMonth: (state) => {
            let today = new Date();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            state.nextMonth = state.events.filter(item => {
                return item.start.getMonth() === month && item.start.getFullYear() === year;
            });
        }
    }
})

export const { setEvents, setThisMonth, setNextMonth } = eventSlice.actions;

export default eventSlice.reducer;
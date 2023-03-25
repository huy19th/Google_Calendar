import { createSlice } from "@reduxjs/toolkit";
import { filterEventThisOrNextMonth } from "../ultils/event.util";

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
            state.thisMonth = filterEventThisOrNextMonth(state.events, false);
            state.nextMonth = filterEventThisOrNextMonth(state.events, true);
        },
    }
})

export const { setEvents } = eventSlice.actions;

export default eventSlice.reducer;
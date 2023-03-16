import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventDetailDialog from "./EventDetailDialog";

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

export default function Calendar() {

    const events = useSelector(state => state.event.events);

    const [open, setOpen] = useState(false);

    const [event, setEvent] = useState({});

    const handleEventClick = ({el: {fcSeg: {eventRange: {def: {extendedProps, title, allDay}, range}}}}) => {
    // const handleEventClick = data => {
        let data = {title, allDay, ...extendedProps, ...range};
        setEvent(data);
        setOpen(true);
        // console.log(data)
    }

    useEffect(() => {}, [events])

    return (
        <>
            <FullCalendar
                headerToolbar={{
                    start: "dayGridMonth,timeGridWeek,timeGridDay today",
                    center: "title",
                    end: "prevYear,prev,next,nextYear"
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
            />
            <EventDetailDialog open={open} setOpen={setOpen} event={event} />
        </>
    )

}
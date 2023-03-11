import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSelector } from "react-redux";

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

    return <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        headerToolbar={{
            start: "dayGridMonth,timeGridWeek,timeGridDay today",
            center: "title",
            end: "prevYear,prev,next,nextYear"
          }}
    />

}
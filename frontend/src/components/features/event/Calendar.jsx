import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const events = [
    { title: "Meeting", start: new Date() }
]

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

export default function Calendar() {

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
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

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
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        headerToolbar={{
            start: 'dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            end: 'custom2 prevYear,prev,next,nextYear'
          }}
        // headerToolbar={{start: "start", center: "center", end: "end"}}
    />

}
import { useSelector } from "react-redux";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
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

    const user = useSelector(state => state.user.currentUser);

    const [open, setOpen] = useState(false);

    const [event, setEvent] = useState({});

    // const handleHover = ({ event: { _def: { title, allDay, extendedProps }, _instance: { range } } }) => {
    //     let data = {title, allDay, ...extendedProps, ...range};
    //     console.log(data)
    //     setEvent(data);
    // }

    const handleHover = info => {
        let id = info.event._def.extendedProps._id;
        let data = events.filter(item => item._id == id)[0];
        console.log(data)
        setEvent(data);
    }

    const handleResize = info => {
        console.log(info);
    }

    const checkAuthorization = () => {
        return event.creator == user._id || user.role == "admin"
    }

    return (
        <>
            <FullCalendar
                headerToolbar={{
                    start: "dayGridMonth,timeGridWeek,timeGridDay today",
                    center: "title",
                    end: "prevYear,prev,next,nextYear"
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dayMaxEvents={true}
                weekends={true}
                editable={true}
                eventStartEditable={true}
                eventResizableFromStart={true}
                events={events}
                eventAllow={checkAuthorization}
                eventClick={() => {
                    setOpen(true);
                }}
                eventContent={renderEventContent}
                eventMouseEnter={handleHover}
                eventResize={handleResize}
            // timeZone="UTC"
            />
            <EventDetailDialog open={open} setOpen={setOpen} event={event} />
        </>
    )

}
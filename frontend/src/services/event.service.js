import { axiosJWT } from "../configs/axios";

export default class EventService {

    static createEvent(values) {
        return axiosJWT.post("/event", values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static getEvents() {
        return axiosJWT.get("/event");
    }

    static deleteEvent(eventId) {
        return axiosJWT.delete(`/event/${eventId}`);
    }

    static updateEvent(values) {
        return axiosJWT.patch(`/event/${values._id}`, values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}

export const {createEvent, getEvents, deleteEvent, updateEvent} = EventService;
import axios, { axiosJWT } from "../configs/axios";

export default class EventService {

    static createEvent(values) {
        return axiosJWT.post("/event", values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static getEvents() {
        return axiosJWT.get("event");
    }
}
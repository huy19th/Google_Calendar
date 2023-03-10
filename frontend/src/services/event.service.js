import axios, { axiosJWT } from "../configs/axios";

export default class eventService {

    static createEvent(values) {
        return axiosJWT.post("/event", values);
    }
}
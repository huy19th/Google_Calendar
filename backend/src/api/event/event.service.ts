import { Event, IEvent } from "./event.model";
import createError from "http-errors";

export default class EventService {

    static async getEventById(id: string) {
        let event = await Event.findById(id);
        if (!event) createError(404, "Event not found");
        return event;
    }

    static async createEvent(event: IEvent): Promise<void> {
        await Event.create(event);
    }

    static async updateEvent(info: any): Promise<void> {
        let event = await this.getEventById(info.id);
        event = {...info};
        await event.save();
    }

    static async deleteEvent(id: string): Promise<void> {
        await Event.findByIdAndDelete(id);
    }
}
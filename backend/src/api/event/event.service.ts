import { Event, IEvent } from "./event.model";
import createError from "http-errors";
import { IUser } from "../user/user.model";

export default class EventService {

    static async getEventById(id: string) {
        let event = await Event.findById(id);
        if (!event) {
            throw createError(404, "Event not found");
        }
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

    static async getEventsCreated(userId: any): Promise<IEvent[]> {
        let events = await Event.find({
            creator: userId
        }).exec();
        return events;
    }

    static async getEventsInvited(userId: any): Promise<IEvent[]> {
        let events = await Event.find({
            participants: {
                $elemMatch: userId
            }
        });
        return events;
    }
}
import { Event, IEvent } from "./event.model";
import createError from "http-errors";
import { IUser } from "../user/user.model";
import { ObjectId } from "mongoose";

export default class EventService {

    static async getEventById(id: string) {
        let event = await Event.findById(id);
        if (!event) {
            throw createError(404, "Event not found");
        }
        return event;
    }

    static async createEvent(info: IEvent): Promise<void> {
        await Event.create(info);
    }

    static async updateEvent(eventId: string, info: any): Promise<void> {
        let event = await this.getEventById(eventId);
        event.title = info.title;
        event.participants = info.participants;
        event.start = info.start;
        event.end = info.end;
        event.allDay = info.allDay;
        event.location = info.location;
        event.description = info.description;
        await event.save();
    }

    static async deleteEvent(id: string): Promise<void> {
        await Event.findByIdAndDelete(id);
    }

    static async getEventsCreatedOrInvited(userId: any): Promise<IEvent[]> {
        let events = await Event.find({
            $or: [
                {
                    creator: userId
                },
                {
                    creator: {
                        $ne: userId
                    },
                    participants: {
                        $elemMatch: {
                            $eq: userId
                        }
                    }
                }
            ]
        }).sort({start: 1}).populate("participants", "username email");
        return events;
    }

    static async getEventsInMonth(userId: any, year: number, month: number) {
        let events = await Event.find({
            $or: [
                {
                    creator: userId,
                    start: {
                        $gte: new Date(year, month - 1, 1),
                        $lt: new Date(year, month, 1)
                    }
                },
                {
                    creator: {
                        $ne: userId,
                    },
                    participants: {
                        $elemMatch: {
                            $eq: userId
                        }
                    },
                    start: {
                        $gte: new Date(year, month - 1, 1),
                        $lt: new Date(year, month, 1)
                    }
                }
            ]
        }).populate("participants", "username email");
        return events;
    }
}
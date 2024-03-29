import { Request, Response, NextFunction } from "express";
import EventService from "./event.service";

export default class EventController {

    static async getEventById(req: Request, res: Response, next: NextFunction) {
        try {
            let event = await EventService.getEventById(req.params.eventId);
            res.status(200).json(event);
        }
        catch (err) {
            next(err);
        }
    }

    static async createEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await EventService.createEvent(req.body);
            res.status(200).json({ message: "Created event successfully" });
        }
        catch (err) {
            next(err);
        }
    }

    static async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await EventService.updateEvent(req.params.eventId, req.body);
            res.status(200).json({ message: "Updated event successfully" });
        }
        catch (err) {
            next(err);
        }
    }

    static async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await EventService.deleteEvent(req.params.eventId);
            res.status(200).json({ message: "Deleted event successfully" });
        }
        catch (err) {
            next(err);
        }
    }

    static async getEvents(req: Request, res: Response, next: NextFunction) {
        try {
            let id = req["user"]._id;
            let events = await EventService.getEventsCreatedOrInvited(id);
            res.status(200).json(events);
        }
        catch (err) {
            next(err);
        }
    }

    static async getEventsInMonth(req: Request, res: Response, next: NextFunction) {
        try {
            let id = req["user"]._id;
            let month = +req.params.month;
            let year = +req.params.year;
            let events = await EventService.getEventsInMonth(id, year, month);
            res.status(200).json(events);
        }
        catch (err) {
            next(err);
        }
    }
}
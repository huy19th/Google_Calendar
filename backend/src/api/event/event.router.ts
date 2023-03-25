import express from "express";
import EventController from "./event.controller";
import multer from "multer";

const eventRouter = express.Router();
const upload = multer();

eventRouter.get("/", EventController.getEvents);
eventRouter.post("/", upload.none(), EventController.createEvent);
eventRouter.get("/:eventId", EventController.getEventById);
eventRouter.get("/year/:year/month/:month", EventController.getEventsInMonth);
eventRouter.patch("/:eventId", upload.none(), EventController.updateEvent);
eventRouter.delete("/:eventId", EventController.deleteEvent);

export default eventRouter;
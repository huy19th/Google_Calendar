import express from "express";
import EventController from "./event.controller";

const eventRouter = express.Router();

eventRouter.get("/:eventId", EventController.getEventById);
eventRouter.post("/", EventController.createEvent);
eventRouter.patch("/:eventId", EventController.updateEvent);
eventRouter.delete("/:eventId", EventController.deleteEvent);

export default eventRouter;
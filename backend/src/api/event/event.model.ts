import { Schema, model, ObjectId } from "mongoose";
import { User, IUser } from "../user/user.model";

interface IEvent {
    title: string,
    creator: IUser;
    participants: [];
    start: Date;
    end: Date;
    allDay: boolean;
    location: string;
    description: string;
}

const eventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: [true, "Event's title required"]
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: [true, "Event's creator required"]
    },
    participants: {
        type: [Schema.Types.ObjectId],
        ref: User
    },
    start: {
        type: Date,
        required: [true, "Start time required"]
    },
    end: {
        type: Date,
        required: [true, "End time required"]
    },
    allDay: {
        type: Boolean,
        required: [true, "All day required"],
        default: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    }
})

const Event = model<IEvent>("Event", eventSchema);

export { Event, IEvent };
"use strict";
exports.__esModule = true;
exports.Event = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("../user/user.model");
var eventSchema = new mongoose_1.Schema({
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.User
    },
    participants: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: user_model_1.User
    },
    start: Date,
    end: Date
});
var Event = (0, mongoose_1.model)("Event", eventSchema);
exports.Event = Event;

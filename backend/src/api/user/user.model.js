"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    name: String,
    role: String
});
var User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;

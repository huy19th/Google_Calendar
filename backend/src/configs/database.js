"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
require("dotenv").config();
var database = {
    connect: function () {
        mongoose_1["default"].set('strictQuery', false);
        mongoose_1["default"].connect(process.env.CLOUD_URL)
            .then(function () { return console.log('DB Connected!'); })["catch"](function (error) { return console.log('DB connection error:', error.message); });
    }
};
exports["default"] = database;

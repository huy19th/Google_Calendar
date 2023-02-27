"use strict";
exports.__esModule = true;
var express_1 = require("express");
var database_1 = require("./configs/database");
var cors_1 = require("cors");
var PORT = 3000;
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.listen(PORT, function () {
    console.log('App running on port: ' + PORT);
});
database_1["default"].connect();

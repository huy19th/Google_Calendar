import express from "express";
import database from "./configs/database";
import cors from "cors";
import checkAuth from "./middlewares/checkAuth";
import authRouter from "./api/auth/auth.router";
import eventRouter from "./api/event/event.router";
import userRouter from "./api/user/user.router";
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use("/api/auth", authRouter);
app.use(checkAuth);
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({message: err.message || "Something is wrong"});
})
database.connect();

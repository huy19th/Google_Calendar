import express from "express";
import database from "./configs/database";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { checkAuth } from "./middlewares/auth.middleware";
import authRouter from "./api/auth/auth.router";
import eventRouter from "./api/event/event.router";
import userRouter from "./api/user/user.router";
import { Request, Response, NextFunction } from "express";

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});



database.connect();
app.use(cors());
app.use("/api/auth", authRouter);
app.use(checkAuth);
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.statusMessage = err.message || "Something is wrong";
    res.status(err.statusCode || 500).end();
});
// app.listen(PORT, () => {
//     console.log("App running on port: " + PORT)
// });
server.listen(PORT, () => {
    console.log("App running on port: " + PORT)
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

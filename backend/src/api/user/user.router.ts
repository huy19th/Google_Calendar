import express from "express";
import UserController from "./user.controller";

const userRouter = express.Router();

userRouter.patch("/info", UserController.updateInfo);
userRouter.patch("/password", UserController.updatePassword);

export default userRouter;
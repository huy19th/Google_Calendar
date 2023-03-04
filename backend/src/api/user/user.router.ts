import express from "express";
import UserController from "./user.controller";
import multer from "multer";

const upload = multer();
const userRouter = express.Router();

userRouter.use(upload.none());
userRouter.post("/", UserController.createUser);
userRouter.post("/id", UserController.getUserId);
userRouter.patch("/info", UserController.updateInfo);
userRouter.patch("/password", UserController.updatePassword);

export default userRouter;
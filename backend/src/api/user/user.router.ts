import express from "express";
import UserController from "./user.controller";
import multer from "multer";

const upload = multer();
const userRouter = express.Router();

userRouter.use(upload.none());
userRouter.get("/", UserController.getUserList);
userRouter.post("/", UserController.createUser);
userRouter.get("/info", UserController.getUserInfo);
userRouter.patch("/info/:id", UserController.updateInfo);
userRouter.patch("/password/:id", UserController.updatePassword);

export default userRouter;
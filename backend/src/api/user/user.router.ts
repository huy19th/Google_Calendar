import express from "express";
import UserController from "./user.controller";
import multer from "multer";

const upload = multer();
const userRouter = express.Router();

userRouter.get("/", UserController.getUserList);
userRouter.post("/", upload.none(), UserController.createUser);
userRouter.get("/info", UserController.getUserInfo);
userRouter.patch("/info/:id", upload.none(), UserController.updateInfo);
userRouter.patch("/password/:id", upload.none(), UserController.updatePassword);

export default userRouter;
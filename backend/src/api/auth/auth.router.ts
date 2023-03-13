import express from "express";
import multer from "multer";
import AuthController from "./auth.controller";
const upload = multer();

const authRouter = express.Router();

authRouter.post("/login", upload.none(), AuthController.login);
authRouter.post("/refresh", upload.none(), AuthController.refreshToken);

export default authRouter;
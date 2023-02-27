import express from "express";
import multer from "multer";
import AuthController from "./auth.controller";
const upload = multer();

const authRouter = express.Router();

authRouter.post('/register', upload.none(), AuthController.register);
authRouter.post('/login', upload.none(), AuthController.login);

export default authRouter;
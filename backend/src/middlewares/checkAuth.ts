import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import UserService from "../api/user/user.service";
require("dotenv").config();

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            createError(401, "You are not authenticated");
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, async (err: Error, decoded: string) => {
            if (err) createError(403, "Invalid token");
            req["user"] = await UserService.getUserById(decoded);
            next();
        });
    }
    catch (err) {
        next(err);
    }
}

export default checkAuth;
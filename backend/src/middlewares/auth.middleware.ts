import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import UserService from "../api/user/user.service";
require("dotenv").config();

export default class AuthMiddleware {
    static async checkAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw createError(401, "You are not authenticated");
            }
            const token = authHeader.split(" ")[1];
            let { _id } = jwt.verify(token, process.env.SECRET_KEY);
            req["user"] = await UserService.getUserById(_id);
            next();
        }
        catch (err) {
            next(err);
        }
    }

    static checkRole(req: Request, res: Response, next: NextFunction) {
        if (req["user"].role !== "admin") {
            next(createError(401, "Unauthorized"));
        }
        else {
            next();
        }
    }

}

export const { checkAuth, checkRole } = AuthMiddleware;
import { Request, Response, NextFunction } from "express";
import UserService from "./user.service";

export default class UserController {

    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.createUser(req.body);
            res.status(200).json({ message: "Register successfully" });
        }
        catch (err) {
            next(err);
        }
    }

    static async getUserInfo(req: Request, res: Response, next: NextFunction) {
        try {
            req["user"].password = undefined;
            res.status(200).json(req["user"]);
        }
        catch (err) {
            next(err);
        }
    }

    static async updateInfo(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.updateInfo(req.params.id, req.body);
            res.status(200).json({ message: "Update info successfully" });
        }
        catch (err) {
            next(err);
        }
    }

    static async updatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.updatePassword(req["user"], req.body.password);
            res.status(200).json({ message: "Update password succesfully" });
        }
        catch (err) {
            next(err);
        }
    }

    static async getUserList(req: Request, res: Response, next: NextFunction) {
        try {
            let users = await UserService.getUserList();
            res.status(200).json(users);
        }
        catch (err) {
            next(err);
        }
    }
}
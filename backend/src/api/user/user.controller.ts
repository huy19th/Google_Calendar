import { Request, Response, NextFunction } from "express";
import UserService from "./user.service";

export default class UserController {

    static async updateInfo(req: Request, res: Response, next: NextFunction) {
        try {
        //@ts-ignore
        await UserService.updateInfo(req.user, req.body.name);
        res.status(200).json({message: "Update info successfully"});
        }
        catch (err) {
            next(err);
        }
    }

    static async updatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            //@ts-ignore
            await UserService.updatePassword(req.user, req.body.password);
            res.status(200).json({message: "Update password succesfully"});
        }
        catch (err) {
            next(err);
        }
    }
}
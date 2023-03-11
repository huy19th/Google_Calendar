import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";
import UserService from "../user/user.service";

export default class AuthController {

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await AuthService.login(req.body);
            let token = AuthService.generateToken(user["id"]);
            user.password = undefined;
            res.status(200).json({
                token: token,
                user: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
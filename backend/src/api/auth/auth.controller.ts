import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";

const defaultErrorMessage = "Something is wrong";

export default class AuthController {

    static register(req: Request, res: Response, next: NextFunction) {
        try {
            AuthService.register(req.body);
            res.status(200).json({ message: "Register successfully" });
        }
        catch (err) {
            next(err);
        }
    }
    
    static login(req: Request, res: Response, next: NextFunction) {
        try {
            let userId = AuthService.login(req.body);
            let token = AuthService.generateToken(userId);
            res.status(200).json({ token: token });
        }
        catch (err) {
            next(err);
        }
    }
}
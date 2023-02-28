import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";

export default class AuthController {
    
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            let userId = await AuthService.login(req.body);
            let token = AuthService.generateToken(userId);
            res.status(200).json({ token: token });
        }
        catch (err) {
            next(err);
        }
    }
}
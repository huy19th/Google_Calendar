import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";
import redisCloud from "../../configs/redis";

export default class AuthController {

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await AuthService.login(req.body);
            let accessToken = AuthService.generateAccessToken({_id: user["id"]});
            let refreshToken = AuthService.generateRefreshToken({_id: user["id"]});
            await redisCloud.set(user["id"], refreshToken);
            user.password = undefined;
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
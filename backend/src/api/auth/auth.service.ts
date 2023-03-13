import { User, IUser } from "../user/user.model";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import redisCloud from "../../configs/redis";
require("dotenv").config();

export default class AuthService {

    static async login({ email, password }): Promise<IUser> {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw createError(404, "User not found");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw createError(401, "Wrong email or password");
        }
        return user;
    }

    static generateAccessToken(value: any): string {
        return jwt.sign(value, process.env.SECRET_KEY, { expiresIn: "15m" });
    }

    static generateRefreshToken(value: any): string {
        return jwt.sign(value, process.env.SECRET_KEY, { expiresIn: "2d" });
    }

    static async verifyRefreshToken({ token }): Promise<string> {
        let { _id } = jwt.verify(token, process.env.SECRET_KEY);
        let currentRefreshToken = await redisCloud.get(_id);
        if (token !== currentRefreshToken) {
            await redisCloud.set(_id, "");
            throw createError(401, "Unauthorized");
        }
        return _id;
    }
}
import { User, IUser } from "../user/user.model";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
require("dotenv").config();

export default class AuthService {

    static async register(info: IUser): Promise<void> {
        info.password = await bcrypt.hash(info.password, process.env.SALT);
        const user = new User(info);
        await user.save();
    }

    static async login({ email, password }): Promise<string> {
        const user = await User.findOne({ email: email });
        if (!user) createError(404, "User not found");
        const match = await bcrypt.compare(password, user.password);
        if (!match) createError(401, "Wrong email or password");
        return user.id;
    }
    
    static generateToken(value: any): string {
        return jwt.sign(value, process.env.SECRET_KEY)
    }
}
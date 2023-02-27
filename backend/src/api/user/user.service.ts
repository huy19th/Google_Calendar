import { User, IUser } from "../user/user.model";
import createError from 'http-errors';
import bcrypt from "bcrypt";

export default class UserService {

    static async createUser(info: any): Promise<void> {
        let user = await this.getUserByEmail(info.email);
        if (user) {
            throw createError(500, "Email already exists");
        }
        info.password = bcrypt.hashSync(info.password, Number(process.env.SALT));
        const {email, password, name} = info;
        await User.create({email, password, name});
    }

    static async getUserById(id: string): Promise<IUser> {
        let user = await User.findById(id);
        if (!user) {
            throw createError(404, "User not found");
        }
        return user;
    }

    static async updateInfo(user: any, name: string): Promise<void> {
        user.name = name;
        await user.save();
    }

    static async updatePassword(user: any, password: string): Promise<void> {
        user.password = password;
        await user.save();
    }

    static async getUsersByEmail(email: string): Promise<IUser[]> {
        return await User.find({email: {$regex: email, "$options": "i"}}, "name email").limit(5).exec();
    }

    static async getUserByEmail(email: string): Promise<IUser> {
        return await User.findOne({email: email});
    }
}
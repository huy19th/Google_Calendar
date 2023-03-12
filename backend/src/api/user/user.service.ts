import { User, IUser } from "../user/user.model";
import createError from 'http-errors';
import bcrypt from "bcrypt";

export default class UserService {

    static async createUser(info: any): Promise<void> {
        let userByEmail = await this.getUserByEmail(info.email);
        let userByName = await this.getUserByUserName(info.name);
        if (userByEmail || userByName) {
            throw createError(500, (userByEmail ? "Email already exists" : "") + (userByName ? "Username already exists" : ""));
        }
        info.password = bcrypt.hashSync(info.password, Number(process.env.SALT));
        const { email, password, username } = info;
        await User.create({ email, password, username });
    }

    static async getUserById(id: string): Promise<any> {
        let user = await User.findById(id);
        if (!user) {
            throw createError(404, "User not found");
        }
        return user;
    }

    static async updateInfo(userId: string, info: IUser): Promise<void> {
        let user = await this.getUserById(userId);
        user.password = info.password ? bcrypt.hashSync(info.password, Number(process.env.SALT)) : user.password;
        user.email = info.email;
        user.username = info.username;
        user.role = info.role;
        await user.save();
    }

    static async updatePassword(user: any, password: string): Promise<void> {
        user.password = password;
        await user.save();
    }

    static async getUsersByEmail(email: string): Promise<IUser[]> {
        return await User.find({ email: { $regex: email, "$options": "i" } }, "name email").limit(5).exec();
    }

    static async getUserByEmail(email: string): Promise<IUser> {
        return await User.findOne({ email: email });
    }

    static async getUserByUserName(username: string): Promise<IUser> {
        return await User.findOne({ username: username });
    }

    static async getUserList(): Promise<IUser[]> {
        return await User.find({}).select("email username role").lean();
    }
}
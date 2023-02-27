import { User, IUser } from "../user/user.model";
import createError from 'http-errors';

export default class UserService {

    static async getUserById(id: string): Promise<IUser> {
        let user = await User.findById(id);
        if (!user) createError(404, "User not found");
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
        return User.find({email: {$regex: email, "$options": "i"}}, "name email").limit(5).exec();
    }
}
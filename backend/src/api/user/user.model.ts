import { Schema, model } from "mongoose";

interface IUser {
    email: string;
    password: string;
    username: string;
    role: "admin" | "user";
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, "Email required"],
        validate: {
            validator: (email: string): boolean => {
                return /^\S+@\S+\.\S+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        minlength: [6, "Password must have at least 6 characters"]
    },
    username: {
        type: String,
        required: [true, "Username required"],
        default: null
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
            message: "{VALUE} is an invalid role"
        },
        default: "user"
    }
})

const User = model<IUser>("User", userSchema);

export { User, IUser };
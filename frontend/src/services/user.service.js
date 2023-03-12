import { axiosJWT } from "../configs/axios";

export default class UserService {

    static getUserInfo() {
        return axiosJWT.get("/user/info");
    }

    static getUserList() {
        return axiosJWT.get("/user");
    }

    static createUser(values) {
        return axiosJWT.post("/user", values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static updateUser(values) {
        return axiosJWT.patch("/user/info", values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
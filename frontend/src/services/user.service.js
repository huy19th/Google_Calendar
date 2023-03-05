import axios from "../configs/axios";
import { axiosJWT } from "../configs/axios";

export default class UserService {

    static getUserInfo() {
        return axiosJWT.get("/user/info");
    }

}
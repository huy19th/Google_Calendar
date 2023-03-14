import axios from "../configs/axios";
import cookies from "../configs/cookies";

export default class AuthService {

    static login(values) {
        return axios.post("/auth/login", values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    static refreshToken() {
        return axios.post("/auth/refresh", { token: cookies.get("refreshToken") }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    static revokeRefreshToken() {
        return axios.delete("/auth/revoke", {
            headers: {
                Authorization: "Bearer " + cookies.get("refreshToken")
            }
        });
    }
}

export const { login, refreshToken, revokeRefreshToken } = AuthService;
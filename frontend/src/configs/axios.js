import axios from "axios";
import env from "react-dotenv";
import cookies from "./cookies";
import AuthService from "../services/auth.service";
import { setAccessToken, setRefeshToken } from "../ultils/cookie.util";

const baseURL = "http://localhost:8000/api"

export default axios.create({
    baseURL: env ? env.BASE_URL : baseURL
});

export const axiosJWT = axios.create({
    baseURL: env ? env.BASE_URL : baseURL
})

axiosJWT.interceptors.request.use(
    async config => {
        let token = cookies.get("accessToken");
        if (!token) {
            let {accessToken, refreshToken} = (await AuthService.refreshToken()).data;
            setAccessToken(accessToken);
            setRefeshToken(refreshToken);
            token = accessToken;
        }
        config.headers["Authorization"] = "Bearer " + token;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)
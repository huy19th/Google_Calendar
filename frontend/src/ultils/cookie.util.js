import cookies from "../configs/cookies";

export default class CookieUtil {

    static setAccessToken(token) {
        cookies.set("accessToken", token, {
            path: "/",
            maxAge: 14 * 60,
        });
    }

    static setRefeshToken(token) {
        cookies.set("refreshToken", token, {
            path: "/",
            maxAge: 2 * 24 * 60 * 60,
        });
    }

}

export const { setAccessToken, setRefeshToken } = CookieUtil;
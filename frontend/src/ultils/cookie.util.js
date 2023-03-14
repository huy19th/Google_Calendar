import cookies from "../configs/cookies";

export default class CookieUtil {

    static setAccessToken(token) {
        cookies.set("accessToken", token, {
            path: "/",
            domain: "localhost",
            maxAge: 14 * 60,
        });
    }

    static setRefeshToken(token) {
        cookies.set("refreshToken", token, {
            path: "/",
            domain: "localhost",
            maxAge: 2 * 24 * 60 * 60,
        });
    }

    static removeTokens() {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
    }

}

export const { setAccessToken, setRefeshToken, removeTokens } = CookieUtil;
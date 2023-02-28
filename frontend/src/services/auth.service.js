import axios from "../configs/axios";

export default class AuthService {

    static login(values) {
        return axios.post("/auth/login", values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
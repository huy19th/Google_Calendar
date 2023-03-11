import axios from "axios";

const baseURL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

export default axios.create({
    baseURL: baseURL
});

export const axiosJWT = axios.create({
    baseURL: baseURL
})

axiosJWT.interceptors.request.use(
    config => {
        config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)
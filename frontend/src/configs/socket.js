import { io } from "socket.io-client";
import env from "react-dotenv";

export const socket = io(env ? env.API_URL : "http://localhost:8000");
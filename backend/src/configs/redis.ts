import { createClient } from 'redis';
require("dotenv").config();

const redisCloud = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

redisCloud.on("error", err => {
    console.log('Redis Client Error', err);
});

redisCloud.connect().then(() => {
    console.log("Redis cloud connected");
});

export default redisCloud;
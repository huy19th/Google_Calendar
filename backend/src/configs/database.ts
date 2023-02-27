import mongoose from 'mongoose';
require("dotenv").config();

let database = {
    connect: () => {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.CLOUD_URL)
            .then(() => console.log('DB Connected!'))
            .catch(error => console.log('DB connection error:', error.message));
    }
}
export default database;
import mongoose from "mongoose";

import { ENV } from "./env.config.js";

export const db = async () => {
    try {
        console.log(`connecting to database...`);
        await mongoose.connect(ENV.MONGO_URI);
        console.log(`connected to database : ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`[Error] : ${error}`);
    }
};

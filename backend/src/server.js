import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env.config.js";
import routes from "./routes/index.js";
import { db } from "./config/db.config.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ENV.FRONTEND_ORIGIN,
    }),
);
app.use(cookieParser());
app.use(
    cors({
        origin: ENV.FRONTEND_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    }),
);

app.use("/", routes);

const PORT = ENV.PORT || 3500;

app.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
    db();
});

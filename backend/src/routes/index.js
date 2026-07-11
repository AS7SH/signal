import { Router } from "express";
import authRoutes from "./auth.route.js";

const routes = Router().use("/auth", authRoutes);

export default routes;

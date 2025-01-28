import { Router } from "express";
import { userRoutes } from "./userRoutes.routes";

export const routes = Router()

routes.use("/user",userRoutes);
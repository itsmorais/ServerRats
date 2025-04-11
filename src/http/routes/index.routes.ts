import { Router } from "express";
import { userRoutes } from "./userRoutes.routes";
import { sessionRoutes } from './authRoutes.routes'
import { groupRoutes } from "./groupRoutes.routes";
import { logRoutes } from "./logRoutes.routes";
export const routes = Router()

routes.use("/", userRoutes);
routes.use("/", sessionRoutes)
routes.use("/group", groupRoutes);
routes.use("/log",logRoutes)
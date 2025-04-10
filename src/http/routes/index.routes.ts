import { Router } from "express";
import { userRoutes } from "./userRoutes.routes";
import { sessionRoutes } from './authRoutes.routes'
import { groupRoutes } from "./groupRoutes.routes";
export const routes = Router()

routes.use("/", userRoutes);
routes.use("/", sessionRoutes)
routes.use("/group", groupRoutes);
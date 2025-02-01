import { Router } from "express";
import { userRoutes } from "./userRoutes.routes";
import {sessionRoutes} from './authRoutes.routes'
export const routes = Router()

routes.use("/api",userRoutes);
routes.use("/api",sessionRoutes)
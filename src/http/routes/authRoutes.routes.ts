import { Router } from "express";
import { authenticate } from "../controllers/Auth/AuthController";

export const sessionRoutes = Router();

sessionRoutes.post("/session", authenticate);


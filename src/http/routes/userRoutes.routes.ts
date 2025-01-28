import { Router } from "express";
import {createUser} from "../controllers/users/UserController";

export const userRoutes = Router();

userRoutes.post("/register", createUser);


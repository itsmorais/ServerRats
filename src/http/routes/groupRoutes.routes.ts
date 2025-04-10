import {  Router } from "express";
import { authMiddlware } from "../middlewares/verifyJWT";
import { GroupsController } from "../controllers/groups/GroupController";

export const groupRoutes = Router();

const groupController = new GroupsController()

groupRoutes.post("/create", authMiddlware,groupController.create);
groupRoutes.get("/list", authMiddlware,groupController.list);


import { Router } from "express";
import { authMiddlware } from "../middlewares/verifyJWT";
import { LogController } from "../controllers/userLogs/LogsController";

export const logRoutes = Router();

const logController = new LogController()

logRoutes.post("/create", authMiddlware, logController.create);
logRoutes.get("/:id", authMiddlware, logController.list)



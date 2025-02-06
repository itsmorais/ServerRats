import { Request, Response, NextFunction } from "express";
import logger from "@/utils/logger";

export function logRequests(req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method} ${req.url} - IP: ${req.ip}`);
    next();
}
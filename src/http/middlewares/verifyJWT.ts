import { env } from "@/env";
import { Response, NextFunction, JwtRequest } from "express";
import jwt from "jsonwebtoken"

interface DecodedToken{
    sub:string;
    role:string;
}

export function authMiddlware(req: JwtRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    };

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken

        console.log("DECODED:",decoded)
        req.user = {
            id:decoded.sub,
            role:decoded.role
        }

        next();
    } catch {
        return res.status(401).json({ message: "Invalid Token" })
    }
}
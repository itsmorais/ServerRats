import { JwtRequest, Response, NextFunction } from "express";

export function roleMiddleware(requiredRole: "ADMIN" | "MEMBER") {
    return (req: JwtRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        };

        if (req.user.role !== requiredRole) {
            console.log("ROLE DO USUÁRIO:",req.user)
            return res.status(403).json({ message: "Forbidden: Insufficient Permissions" })
        }

        next();
    }
}
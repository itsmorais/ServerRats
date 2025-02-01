import { JwtRequest, Router } from "express";
import { createUser } from "../controllers/users/UserController";
import { authMiddlware } from "../middlewares/verifyJWT";
import { roleMiddleware } from "../middlewares/verifyUserRole";

export const userRoutes = Router();

userRoutes.post("/register", createUser);

// TESTES
userRoutes.get("/profile", authMiddlware, (req: JwtRequest, res) => {
    return res.json({ message: "User Profile", user: req.user });
});

//Protected Admin Route
userRoutes.get("/admin", authMiddlware, roleMiddleware("ADMIN"), (req, res) => {
    return res.json({ message: "Welcome Admin!" });
});

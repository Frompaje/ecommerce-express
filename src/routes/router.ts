import { Router } from "express";
import { signUp } from "../controllers/auth";
import { login } from "../controllers/login";
import { authMiddleware } from "../middlewares/auth";
import { user } from "../controllers/user";

const authRoutes: Router = Router();

authRoutes.post("/signUp", signUp);
authRoutes.post("/login", login);
authRoutes.get("/me", [authMiddleware], user);

export default authRoutes;

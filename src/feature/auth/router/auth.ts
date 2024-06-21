import { Router } from "express";
import { AuthController } from "../controller/auth";

const authRoutes: Router = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);

export default authRoutes;

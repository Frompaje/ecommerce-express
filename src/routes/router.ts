import { Router } from "express";
import { signUp } from "../controllers/auth";
import { login } from "../controllers/login";
import { createProduct } from "../controllers/product";
import { adminMiddleware } from "../middlewares/admin";
// import { authMiddleware } from "../middlewares/auth"; example

const authRoutes: Router = Router();

authRoutes.post("/signUp", signUp);
authRoutes.post("/login", login);
authRoutes.post("/product", [adminMiddleware], createProduct);

// authRoutes.get("/me", [authMiddleware], user); example

export default authRoutes;

import { Router } from "express";
import { UserController } from "../controller/user";
import { authMiddleware } from "../../../middlewares/auth";

const userRoutes: Router = Router();
const userController = new UserController();

userRoutes.post("/signUp", userController.signUp);
userRoutes.patch("/name", [authMiddleware], userController.update);
userRoutes.patch("/email", [authMiddleware], userController.updateEmail);
userRoutes.patch("/password", [authMiddleware], userController.updatePassword);
userRoutes.delete("/delete", [authMiddleware], userController.delete);

export default userRoutes;

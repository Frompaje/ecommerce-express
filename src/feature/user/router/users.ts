import { Router } from "express";
import { UserController } from "../controller/user";

const userRoutes: Router = Router();
const userController = new UserController();

userRoutes.post("/signUp", userController.signUp);
userRoutes.patch("/name", userController.update);
userRoutes.patch("/email", userController.updateEmail);
userRoutes.patch("/password", userController.updatePassword);
userRoutes.delete("/delete", userController.delete);

export default userRoutes;

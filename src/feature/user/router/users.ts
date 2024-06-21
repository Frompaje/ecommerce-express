import { Router } from "express";
import { UserController } from "../controller/user";

const userRoutes: Router = Router();
const userController = new UserController();

userRoutes.post("/signUp", userController.signUp);

export default userRoutes;

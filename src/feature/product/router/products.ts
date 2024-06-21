import { Router } from "express";
import { adminMiddleware } from "../../../middlewares/admin";
import { productControllerFactory } from "./product-controller-factory";

const productRouter: Router = Router();

const productController = productControllerFactory()

productRouter.post("/product", [adminMiddleware], productController.create);




export default productRouter;

import { Router } from "express";
import { ControllerProduct } from "../controller/product";
import { adminMiddleware } from "../../../middlewares/admin";

const productRouter: Router = Router();
const productController = new ControllerProduct();

productRouter.post("/product", [adminMiddleware], productController.create);




export default productRouter;

import { Express } from "express";
import userRoutes from "../feature/user/router/users";
import productRouter from "../feature/product/router/products";

export function rootRouter(app: Express) {
  app.use("/auth", userRoutes);
  app.use("/product", productRouter);
}

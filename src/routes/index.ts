import { Express } from "express";
import userRoutes from "../feature/user/router/users";
import productRouter from "../feature/product/router/products";
import authRoutes from "../feature/auth/router/auth";

export function rootRouter(app: Express) {
  app.use("/auth", authRoutes);
  app.use("/product", productRouter);
  app.use("/", userRoutes)
}

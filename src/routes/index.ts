import { Express } from "express";
import authRoutes from "./router";

export function rootRouter(app: Express) {
  app.use("/auth", authRoutes);
}

import { Express } from "express";
import authRoutes from "./auth";

export function rootRouter(app: Express) {
  app.use("/auth", authRoutes);
}

import express from "express";
import { env } from "./env";
import { rootRouter } from "./routes";

const app = express();

app.use(express.json());

rootRouter(app);

app.listen(env.PORT, () => {
  console.log("Server is Running, on port: 3000");
});

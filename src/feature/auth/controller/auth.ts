import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ZodError, z } from "zod";
import { env } from "../../../env";
import { UserDoesNotExist } from "../../user/error/user-does-not-exist-error";
import { InvalidCredentialsError } from "../error/invalid-credential-error";
import { authServiceRepositoryFactory } from "./factory/auth-services-repository-factory";

export class AuthController {
  async login(req: Request, res: Response) {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const { email, password } = loginSchema.parse(req.body);
      const authService = authServiceRepositoryFactory()


      const user = await authService.login({ email, password })


      const token = jwt.sign(
        {
          sub: user.id,
        },
        env.JWT_SECRET
      );

      res.status(200).send({
        User: user.id,
        Token: token,
      });
    } catch (error) {
      console.log(`${error}, Rota:{Controller:Login}`);

      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation error",
          issues: error.format(),
        });
      }
      if (error instanceof UserDoesNotExist) {
        return res.status(400).send({
          message: error.message,
        });
      }
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).send({
          message: error.message,
        });
      }
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}

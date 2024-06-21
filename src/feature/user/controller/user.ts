import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { prisma } from "../../../lib/prisma";
import { UserAlreadyExistsError } from "../error/user-already-exists-error";

export class UserController {
  async signUp(req: Request, res: Response) {
    const signUpSchema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const { name, email, password } = signUpSchema.parse(req.body);



      const passwordHashed = await hash(password, 6);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHashed,
        },
      });

      res.status(201).send({
        user: { name: user.name, email: user.email, password: user.password },
      });
    } catch (error) {
      console.log(`${error}, Rota:{Controller:SignUp}`);

      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation error",
          issues: error.format(),
        });
      }
      if (error instanceof UserAlreadyExistsError) {
        return res.status(400).send({
          message: error.message,
        });
      }

      return res.status(500).send({ message: "Internal server error" });
    }
  }

}

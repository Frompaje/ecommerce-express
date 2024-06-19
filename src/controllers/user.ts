import { Request, Response } from "express";
import { ZodError } from "zod";
import { InvalidCredentialsError } from "../error/invalid-credential-error";
import { UserDoesNotExist } from "../error/user-does-not-exist-error";

export async function user(req: Request, res: Response) {
  try {
    return res.status(200).send();
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

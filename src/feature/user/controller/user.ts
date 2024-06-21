import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { UserAlreadyExistsError } from "../error/user-already-exists-error";
import { userServiceRepositoryFactory } from "./factory /user-services-repository-factory";

export class UserController {
  async signUp(req: Request, res: Response) {
    const signUpSchema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const { name, email, password } = signUpSchema.parse(req.body);
      const userServices = userServiceRepositoryFactory();

      const user = await userServices.create({
        name,
        email,
        password,
      });

      res.status(201).send({
        user: { name: user.name },
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

  async delete(req: Request, res: Response) {
    const deleteSchema = z.object({
      id: z.string(),
    });
    try {
      const { id } = deleteSchema.parse(req.body);
      const userServices = userServiceRepositoryFactory();

      const user = await userServices.delete({ id });

      return res.status(200).send({ user: { id: user.id } });
    } catch (error) {
      console.log(`${error}, Rota:{Controller:Delete}`);

      if (error instanceof ZodError) {
        {
          return res.status(400).send({
            message: "Validation error",
            issues: error.format(),
          });
        }
      }
      if (error instanceof UserAlreadyExistsError) {
        return res.status(400).send({
          message: error.message,
        });
      }
    }
    return res.status(500).send({ message: "Internal server error" });
  }

  async update(req: Request, res: Response) {
    const updateSchema = z.object({
      id: z.string(),
      name: z.string(),
    });

    try {
      const { id, name } = updateSchema.parse(req.body);
      const userServices = userServiceRepositoryFactory();

      const user = await userServices.update({ id, name });
      return res
        .status(200)
        .send({ before: { name }, after: { name: user.name } });
    } catch (error) {
      console.log(`${error}, Rota:{Controller:Update}`);

      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation Error",
          issue: error.format(),
        });
      }

      if (error instanceof UserAlreadyExistsError) {
        return res.status(400).send({
          message: error.message,
        });
      }
    }
    return res.status(500).send({ message: "Internal server error" });
  }

  async updateEmail(req: Request, res: Response) {
    const updateEmailSchema = z.object({
      id: z.string(),
      email: z.string().email(),
    });

    try {
      const { id, email } = updateEmailSchema.parse(req.body);
      const userServices = userServiceRepositoryFactory();
      const user = await userServices.updateEmail({ id, email });

      return res
        .status(200)
        .send({ before: { email }, after: { email: user.email } });
    } catch (error) {
      console.log(`${error}, Rota:{Controller:UpdateEmail}`);
      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation Error",
          issue: error.format(),
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


  async updatePassword(req: Request, res: Response) {
    const updatePassword = z.object({
      id: z.string(),
      password: z.string()
    })
    try {
      const { id, password } = updatePassword.parse(req.body)
      const userServices = userServiceRepositoryFactory();

      const user = await userServices.updatePassowrd({ id, password })
      return res.status(200).send({ before: { password }, after: { password: user.password } })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation Error",
          issue: error.format()
        })
      }
      if (error instanceof UserAlreadyExistsError) {
        return res.status(400).send({
          message: error.message
        })
      }
      return res.status(500).send({ message: "Internal server error" })
    }


  }
}

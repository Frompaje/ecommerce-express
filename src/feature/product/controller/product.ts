import { Request, Response } from "express";
import z, { ZodError } from "zod";
import { UnauthorizedError } from "../../../error/Unauthorized-error";
import { prisma } from "../../../lib/prisma";

export class ControllerProduct {
  async create(req: Request, res: Response) {
    const productSchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      tags: z.array(z.string()),
      price: z.number(),
    });

    try {
      const { name, description, tags, price } = productSchema.parse(req.body);

      const product = await prisma.product.create({
        data: { name, description, tags, price },
      });

      return res.status(201).send({ product });
    } catch (error) {
      console.log(`${error}, Rota:{ControllerProduct:Create}`);

      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation error",
          issues: error.format(),
        });
      }

      if (error instanceof UnauthorizedError) {
        return res.status(401).send({
          message: error.message,
        });
      }

      return res.status(500).send({
        message: "Internal server error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    const productSchema = z.object({
      id: z.string(),
    });


    try {
      const { id } = productSchema.parse(req.body);
      const product = await prisma.product.delete({
        where: {
          id: id
        }
      })

      return res.status(200).send({ product })
    } catch (error) {
      console.log(`${error}, Rota:{ControllerProduct:delete}`);

      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation error",
          issues: error.format(),
        })
      }


    }

  }
}

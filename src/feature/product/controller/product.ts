import { Request, Response } from "express";
import z, { ZodError } from "zod";
import { UnauthorizedError } from "../../auth/error/Unauthorized-error";
import { ModelProductRepository } from "../model/model-repository";
import { PrismaProductRepository } from "../repository/prisma-repository";
import { ProductService } from "../services/product-service";

export class ControllerProduct {
  constructor(
    private readonly productService: ProductService,
    private readonly productRepository: ModelProductRepository
  ) { }
  async create(req: Request, res: Response) {
    const productSchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      tags: z.array(z.string()),
      price: z.number(),
    });

    try {
      const { name, description, tags, price } = productSchema.parse(req.body);
      const productRepository = new PrismaProductRepository();
      const productService = new ProductService(productRepository);

      const product = await productService.create({
        name,
        description,
        tags,
        price,
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
      const productRepository = new PrismaProductRepository();
      const productService = new ProductService(productRepository);

      const product = await productService.delete({ id });

      return res.status(200).send({ product });
    } catch (error) {
      console.log(`${error}, Rota:{ControllerProduct:Delete}`);

      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation error",
          issues: error.format(),
        });
      }
    }
  }

  async update(req: Request, res: Response) {
    const productSchema = z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      price: z.number().optional(),
    });

    try {
      const { id, name, description, tags, price } = productSchema.parse(
        req.body
      );
      const productRepository = new PrismaProductRepository();
      const productService = new ProductService(productRepository);

      const product = await productService.update({
        id,
        name,
        description,
        tags,
        price,
      });

      return res.status(200).send({ product });
    } catch (error) {
      console.log(`${error}, Rota:{ControllerProduct:Update}`);
    }
  }
}

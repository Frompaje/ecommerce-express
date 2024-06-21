import { ControllerProduct } from "../controller/product";
import { PrismaProductRepository } from "../repository/prisma-repository";
import { ProductService } from "../services/product-service";

export function productControllerFactory() {

  const productRepository = new PrismaProductRepository();
  const productService = new ProductService(productRepository)
  const productController = new ControllerProduct(productService, productRepository);
  return productController

}
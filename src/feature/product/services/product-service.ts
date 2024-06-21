import { ModelProductRepository, ProductCreateInput } from "../model/model-repository";
import { ProductAlreadyExist } from "../error/product-already-exists-error";

export class ServiceProduct implements ModelProductRepository {
  constructor(private readonly productRepository: ModelProductRepository) { }
  async create({
    name, description, price, tags
  }: ProductCreateInput) {
    const product = await this.productRepository.create({
      name, description, price, tags
    })

    if (product) {
      throw new ProductAlreadyExist()
    }

    return product
  }



}
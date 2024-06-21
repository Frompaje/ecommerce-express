import { ModelProductRepository, ProductCreateInput, ProductDeleteInput } from "../model/model-repository";
import { ProductAlreadyExist } from "../error/product-already-exists-error";
import { ProductDoesNotExist } from "../error/product-does-not-exist-error";

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

  async delete({
    id
  }: ProductDeleteInput) {
    const product = await this.productRepository.delete({
      id
    })
    if (!product) {
      throw new ProductDoesNotExist()
    }

    return product
  }


}
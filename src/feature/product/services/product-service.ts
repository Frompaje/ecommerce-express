import { ModelProductRepository, ProductCreateInput, ProductIdInput, ProductUpdate } from "../model/model-repository";
import { ProductAlreadyExist } from "../error/product-already-exists-error";
import { ProductDoesNotExist } from "../error/product-does-not-exist-error";

export class ProductService {
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
  }: ProductIdInput) {
    const isProductExist = await this.productRepository.findById({
      id
    })

    if (!isProductExist) {
      throw new ProductDoesNotExist()
    }

    const product = await this.productRepository.delete({
      id
    })

    return product

  }

  async update({
    id, name, description, price, tags
  }: ProductUpdate) {
    const isProductExist = await this.productRepository.findById({
      id
    })

    if (!isProductExist) {
      throw new ProductDoesNotExist()
    }

    const product = await this.productRepository.update({
      id, name, description, price, tags
    })

    return product
  }
}
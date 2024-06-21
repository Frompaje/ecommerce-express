import { Product } from "@prisma/client";


export interface ProductCreateInput {
  name: string
  description: string
  tags: string[]
  price: number
}

export interface ProductDeleteInput {
  id: string
}

export interface ModelProductRepository {
  create({ name, description, tags, price }: ProductCreateInput): Promise<Product>
  delete({ id }: ProductDeleteInput): Promise<Product>
}


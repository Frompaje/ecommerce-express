import { Product } from "@prisma/client";


export interface ProductCreateInput {
  name: string
  description: string
  tags: string[]
  price: number
}

export interface ProductIdInput {
  id: string
}

export interface ProductUpdate {
  id: string
  name?: string
  description?: string
  tags?: string[]
  price?: number
}

export interface ModelProductRepository {
  create({ name, description, tags, price }: ProductCreateInput): Promise<Product>
  delete({ id }: ProductIdInput): Promise<Product>
  update({ id }: ProductUpdate): Promise<Product>
  findById({ id }: ProductIdInput): Promise<Product | null>
}


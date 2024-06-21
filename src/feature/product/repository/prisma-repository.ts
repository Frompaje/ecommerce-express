import { prisma } from "../../../lib/prisma";
import { ModelProductRepository, ProductCreateInput, ProductDeleteInput } from "../model/model-repository";



export class PrismaProductRepository implements ModelProductRepository {
  create({ name, description, tags, price }: ProductCreateInput) {
    return prisma.product.create({
      data: {
        name,
        description,
        tags,
        price
      }
    })
  }

  delete({ id }: ProductDeleteInput) {
    return prisma.product.delete({
      where: {
        id
      }
    })
  }

}




import { prisma } from "../../../lib/prisma";
import { ModelProductRepository, ProductCreateInput, ProductIdInput, ProductUpdate } from "../model/model-repository";



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

  delete({ id }: ProductIdInput) {
    return prisma.product.delete({
      where: {
        id
      }
    })
  }

  update({ id, name, description, tags, price }: ProductUpdate) {
    return prisma.product.update({
      data: {
        name, description, tags, price
      },
      where: {
        id
      }
    })
  }

  findById({ id }: ProductIdInput) {
    return prisma.product.findFirst({
      where: { id }
    })
  }


}




import { prisma } from "../../../lib/prisma";
import { ModelUserRepository, UserInputCreate, UserInputId, UserInputUpdate, UserInputUpdateEmail, UserInputUpdatePassword } from "../model/model-repository";

export class PrismaUserRepository implements ModelUserRepository {
  create({ name, email, password }: UserInputCreate) {
    return prisma.user.create({
      data: {
        name, email, password
      }
    })
  }

  delete({ id }: UserInputId) {
    return prisma.user.delete({
      where: { id }
    })
  }

  findById({ id }: UserInputId) {
    return prisma.user.findFirst({
      where: { id }
    })
  }
  update({ id, name }: UserInputUpdate) {
    return prisma.user.update({
      data: { name },
      where: { id }
    })
  }

  updateEmail({ id, email }: UserInputUpdateEmail) {
    return prisma.user.update({
      data: {
        email
      },
      where: {
        id
      }
    })
  }
  updatePassword({ id, password }: UserInputUpdatePassword) {
    return prisma.user.update({
      data: {
        password
      },
      where: {
        id
      }
    })
  }

}

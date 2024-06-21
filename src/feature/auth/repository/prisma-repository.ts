import { prisma } from "../../../lib/prisma";
import { Login, ModelAuthRepository } from "../model/mode-repository";

export class PrismaAuthRepository implements ModelAuthRepository {
  findUserbyEmail({ email }: Login) {
    return prisma.user.findFirst({
      where: {
        email
      }
    })
  }
}
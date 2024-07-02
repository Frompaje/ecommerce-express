import { UserCreateInput, UserFindIdInput, UserFindInput, UserRepository } from "@/features/user/repository/user.repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database.service";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  create({ name, password, email, address }: UserCreateInput) {
    return this.prisma.user.create({
      data: {
        name,
        password,
        email,
        address,
      },
    });
  }

  delete({ id }: UserFindIdInput) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  findByEmail({ email }: UserFindInput) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  findById({ id }: UserFindIdInput) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }
}

import { PrismaService } from "@/infra/database/database.service";
import { UserRepository } from "./repository/user.repository";
import { PrismaUserRepository } from "@/infra/database/repository/prisma-user.repository";
import { BcryptoRepository } from "@/infra/crypto/bcrypto.repository";
import { BcryptoService } from "@/infra/crypto/bcrypto.service";
import { UserController } from "./controller/user.controller";
import { CreateUserService } from "./services/create-user.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: BcryptoRepository,
      useClass: BcryptoService,
    },
  ],
})
export class UserModule {}

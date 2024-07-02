import { UserController } from '@/features/user/controller/user.controller';
import { UserRepository } from '@/features/user/repository/user.repository';
import { CreateUserService } from '@/features/user/services/create-user.service';
import { Module } from '@nestjs/common';
import { BcryptoRepository } from 'src/infra/crypto/bcrypto.repository';
import { BcryptoService } from 'src/infra/crypto/bcrypto.service';
import { PrismaService } from 'src/infra/database/database.service';
import { PrismaUserRepository } from './repository/prisma-user.repository';

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
export class UserDataBaseModule {}

import { PrismaUserRepository } from '../../infra/database/repository/prisma-user.repository';
import { Module } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { BcryptoRepository } from '@/infra/crypto/bcrypto.repository';
import { BcryptoService } from '@/infra/crypto/bcrypto.service';
import { PrismaService } from '@/infra/database/database.service';

@Module({
  imports: [],
  providers: [
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
export class AuthModule {}

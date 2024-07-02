import { EnvService } from '@/env/env.service';
import { BcryptoRepository } from '@/infra/crypto/bcrypto.repository';
import { BcryptoService } from '@/infra/crypto/bcrypto.service';
import { PrismaService } from '../../infra/database/database.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaUserRepository } from '../../infra/database/repository/prisma-user.repository';
import { UserRepository } from '../user/repository/user.repository';
import { LoginController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (envService: EnvService) => {
        return {
          global: true,
          secret: envService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
      inject: [EnvService],
    }),
  ],
  controllers: [LoginController],
  providers: [
    EnvService,
    PrismaService,
    AuthService,
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

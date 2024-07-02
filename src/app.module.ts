import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { UserDataBaseModule } from './infra/database/database.module';
import { UserModule } from './features/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '../src/env/env';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    AuthModule,
    UserDataBaseModule,
    UserModule,
    EnvModule,
    ConfigModule.forRoot({
      validate: (env) => validateEnv(env),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

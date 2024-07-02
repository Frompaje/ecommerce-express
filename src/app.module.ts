import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { UserDataBaseModule } from './infra/database/database.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [AuthModule, UserDataBaseModule, UserModule],
})
export class AppModule {}

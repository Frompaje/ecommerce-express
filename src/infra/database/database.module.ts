// import { Module } from '@nestjs/common';
// import { BcryptoRepository } from 'src/infra/crypto/bcrypto.repository';
// import { BcryptoService } from 'src/infra/crypto/bcrypto.service';
// import { PrismaService } from 'src/infra/database/database.service';
// import { PrismaUserRepository } from 'src/infra/database/repositories/prisma-user.repository';

// import { UserController } from './controller/user.controller';
// import { UserRepository } from './repositories/user.repository';
// import { CreateUserService } from './services/create-user.service';

// @Module({
//   controllers: [UserController],
//   providers: [
//     CreateUserService,
//     PrismaService,
//     {
//       provide: UserRepository,
//       useClass: PrismaUserRepository,
//     },
//     {
//       provide: BcryptoRepository,
//       useClass: BcryptoService,
//     },
//   ],
// })
// export class UserModule {}

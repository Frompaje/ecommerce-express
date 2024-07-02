import { Module } from '@nestjs/common';
import { BcryptoService } from './bcrypto.service';


@Module({ providers: [BcryptoService], exports: [BcryptoService] })
export class BcryptoModule {}

import { Injectable } from '@nestjs/common';

import type { BcryptoRepository } from './bcrypto.repository';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BcryptoService implements BcryptoRepository {
  private SALT = 8;

  async compare(password: string, hashedPassword: string) {
    const result = await compare(password, hashedPassword);
    return result;
  }

  async hash(password: string) {
    const hashed = await hash(password, this.SALT);
    return hashed;
  }
}

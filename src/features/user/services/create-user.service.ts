import { ConflictException, Injectable } from '@nestjs/common';
import { BcryptoRepository } from '../../../infra/crypto/bcrypto.repository';

import type { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bscrypt: BcryptoRepository,
  ) {}

  async execute({ name, password, email, address }: Input): Promise<Output> {
    const userExist = await this.userRepository.findByEmail({ email });

    if (userExist) {
      throw new ConflictException('User Already Exist');
    }
    const passwordHashed = await this.bscrypt.hash(password);
    const user = await this.userRepository.create({
      name,
      password: passwordHashed,
      email,
      address,
    });
    return { user };
  }
}

type Input = {
  name: string;
  password: string;
  email: string;
  address: string;
};

type Output = {
  user: User;
};

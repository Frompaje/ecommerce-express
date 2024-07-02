import { BcryptoRepository } from '@/infra/crypto/bcrypto.repository';
import { UserRepository } from '../user/repository/user.repository';

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptRepository: BcryptoRepository,
  ) {}

  async validateUser({ email, password }: Input) {
    const user = await this.userRepository.findByEmail({ email });
    if (!user) {
      return null;
    }

    const isSamePassword = await this.bcryptRepository.compare(
      password,
      user.password,
    );

    if (!isSamePassword) {
      return null;
    }

    return { user };
  }
}

export type Input = {
  email: string;
  password: string;
};

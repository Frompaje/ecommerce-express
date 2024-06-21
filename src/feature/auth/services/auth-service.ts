import { compareSync } from "bcryptjs";
import { InvalidCredentialsError } from "../error/invalid-credential-error";
import { LoginInput, ModelAuthRepository } from "../model/mode-repository";

export class AuthService {

  constructor(private readonly authRepository: ModelAuthRepository) {

  }
  async login({ email, password }: LoginInput) {
    const user = await this.authRepository.findUserbyEmail({ email })

    if (!user) {
      throw new InvalidCredentialsError()
    }
    const isSamePassword = compareSync(password, user.password);

    if (!isSamePassword) {
      throw new InvalidCredentialsError()
    }
    return user
  }
}
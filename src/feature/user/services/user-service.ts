import { unwatchFile } from "fs";
import { UserAlreadyExistsError } from "../error/user-already-exists-error";
import { ModelUserRepository, UserInputCreate, UserInputId, UserInputUpdate, UserInputUpdateEmail, UserInputUpdatePassword } from "../model/model-repository";

export class UserProduct {
  constructor(private readonly userRepository: ModelUserRepository) { }

  async create({ name, email, password }: UserInputCreate) {
    const user = await this.userRepository.create({
      name, email, password
    })

    if (user) {
      throw new UserAlreadyExistsError()
    }
    return user
  }

  async delete({ id }: UserInputId) {
    const isUserExist = await this.userRepository.findById({ id })

    if (!isUserExist) {
      throw new UserAlreadyExistsError()
    }


    const user = await this.userRepository.delete({ id })
    return user
  }


  async update({ id, name }: UserInputUpdate) {
    const isUserExist = await this.userRepository.findById({ id })

    if (!isUserExist) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.update({ id, name })

    return user
  }

  async updateEmail({ id, email }: UserInputUpdateEmail) {
    const isUserExist = await this.userRepository.findById({ id })

    if (!isUserExist) {
      throw new UserAlreadyExistsError()
    }

    const updateEmail = await this.userRepository.updateEmail({ id, email })
    return updateEmail
  }

  async updatePassowrd({ id, password }: UserInputUpdatePassword) {
    const isUserExist = await this.userRepository.findById({ id })

    if (!isUserExist) {
      throw new UserAlreadyExistsError()
    }

    const updatePassword = await this.userRepository.updatePassword({ id, password })
    return updatePassword
  }
}
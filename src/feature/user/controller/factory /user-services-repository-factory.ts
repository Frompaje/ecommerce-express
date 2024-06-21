import { PrismaUserRepository } from "../../repository/prisma-repository"
import { UserService } from "../../services/user-service"

export function userServiceRepositoryFactory() {
  const userRepository = new PrismaUserRepository()
  const userServices = new UserService(userRepository)

  return userServices
}
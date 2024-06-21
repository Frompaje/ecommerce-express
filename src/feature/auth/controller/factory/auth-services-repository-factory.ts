import { PrismaAuthRepository } from "../../repository/prisma-repository";
import { AuthService } from "../../services/auth-service";

export function authServiceRepositoryFactory() {
  const authRepository = new PrismaAuthRepository();
  const authService = new AuthService(authRepository)
  return authService
}
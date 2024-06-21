import { User } from "@prisma/client"

export type Login = {
  email: string

}

export type LoginInput = {
  email: string
  password: string
}

export interface ModelAuthRepository {

  findUserbyEmail({ email }: Login): Promise<User | null>

}
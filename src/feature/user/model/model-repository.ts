import { User } from "@prisma/client"

export type UserInputCreate = {
  name: string
  email: string
  password: string
}


export interface ModelUserRepository {
  create({ name, email, password }: UserInputCreate): Promise<User>

}
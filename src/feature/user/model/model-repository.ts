import { User } from "@prisma/client"

export type UserInputCreate = {
  name: string
  email: string
  password: string
}
export type UserInputId = {
  id: string
}
export type UserInputEmail = {
  email: string
}
export type UserInputUpdate = {
  id: string
  name?: string
}
export type UserInputIdEmail = {
  id: string
  email: string
}
export type UserInputUpdatePassword = {
  id: string
  password: string
}

export interface ModelUserRepository {
  create({ name, email, password }: UserInputCreate): Promise<User>
  delete({ id }: UserInputId): Promise<User>
  update({ id, name }: UserInputUpdate): Promise<User>
  updateEmail({ id, email }: UserInputIdEmail): Promise<User>
  updatePassword({ id, password }: UserInputUpdatePassword): Promise<User>
  findById({ id }: UserInputId): Promise<User | null>
  findByEmail({ email }: UserInputEmail): Promise<User | null>
}
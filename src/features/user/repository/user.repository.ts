import { User } from "../entities/user.entity";

export abstract class UserRepository {
  abstract create({
    name,
    password,
    email,
    address,
  }: UserCreateInput): Promise<User>;
  abstract findByEmail({ email }: UserFindInput): Promise<User | null>;
  abstract findById({ id }: UserFindIdInput): Promise<User | null>;
  abstract delete({ id }: UserFindIdInput): Promise<User>;
}

export type UserCreateInput = {
  name: string;
  password: string;
  email: string;
  address: string;
};

export type UserFindInput = {
  email: string;
};

export type UserFindIdInput = {
  id: string;
};

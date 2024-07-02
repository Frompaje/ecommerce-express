import { User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  id: string;
  name: string;
  password: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

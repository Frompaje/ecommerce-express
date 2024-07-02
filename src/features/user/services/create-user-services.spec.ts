import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BcryptoRepository } from '../../../infra/crypto/bcrypto.repository';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { CreateUserService } from './create-user.service';
import { UserMock } from './factory/make.user.faker';

describe('[Service Create] Should create a user', () => {
  let userRepository: UserRepository;
  let bcrypt: BcryptoRepository;
  let userService: CreateUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: BcryptoRepository,
          useValue: {
            compare: jest.fn(),
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get(UserRepository);
    bcrypt = module.get(BcryptoRepository);
    userService = module.get(CreateUserService);
  });

  describe('[Success]', () => {
    it('Should create a user', async () => {
      const userMock = UserMock.create({ name: 'Yan Edwards' });
      const userRepositorySpy = jest
        .spyOn(userRepository, 'create')
        .mockResolvedValue(userMock);

      const { user } = await userService.execute(userMock);
      expect(userRepositorySpy).toBeCalledTimes(1);
      expect(user.name).toEqual('Yan Edwards');
    });

    it('The user you create must have the password hashed', async () => {
      const userMock = UserMock.create({ password: '123456' });

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');

      await userService.execute(userMock);

      const mockPrismaAdapter = jest
        .spyOn(userRepository, 'create')
        .mockResolvedValue(userMock);

      expect(mockPrismaAdapter).toHaveBeenCalledWith({
        name: userMock.name,
        email: userMock.email,
        password: 'hashed-password',
        address: userMock.address,
      });
    });
  });

  describe('[Err]', () => {
    it("Shouldn't register the user if they already exist", async () => {
      const userMock = UserMock.create();

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(userMock);

      await expect(() => {
        return userService.execute(userMock);
      }).rejects.toBeInstanceOf(ConflictException);
    });
  });
});

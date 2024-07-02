import { BcryptoRepository } from '../../../infra/crypto/bcrypto.repository';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
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
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: BcryptoRepository,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    bcrypt = module.get<BcryptoRepository>(BcryptoRepository);
    userService = module.get<CreateUserService>(CreateUserService);
  });

  describe('[Success]', () => {
    it('Should create a user', async () => {
      const userMock = UserMock.create({ name: 'Yan Edwards' });

      const userRepositorySpy = jest.spyOn(userRepository, 'create');

      const { user } = await userService.execute(userMock);

      expect(userRepositorySpy).toBeCalledTimes(1);
      expect(user.name).toEqual('Yan Edwards');
    });
  });

  it('The user you create must have the password hashed', async () => {
    const isPasswordHashed = await bcrypt.hash('123456');

    const userMock = UserMock.create({ password: isPasswordHashed });

    jest.spyOn(userRepository, 'create').mockResolvedValue(userMock);

    const { user } = await userService.execute(userMock);

    const isPasswordCorrrectHashed = await bcrypt.compare(
      '123456',
      user.password,
    );

    expect(isPasswordCorrrectHashed).toBe(true);
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

import { Test } from '@nestjs/testing';

import { CreateUserService } from '../services/create-user.service';
import { UserController } from './user.controller';
import { BcryptoRepository } from '@/infra/crypto/bcrypto.repository';
import { UserRepository } from '../repository/user.repository';
import { UserMock } from '../services/factory/make.user.faker';

describe('User Controller', () => {
  let userController: UserController;
  let userServices: CreateUserService;
  let bcrypt: BcryptoRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers:[UserController],
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
            hash: jest.fn(),
            compare:jest.fn()
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userServices = module.get<CreateUserService>(CreateUserService);
    bcrypt = module.get<BcryptoRepository>(BcryptoRepository);
  });

  it('[POST] /user ', async () => {
    const result = { user: UserMock.create() };

    jest
      .spyOn(userServices, 'execute')
      .mockImplementation(() => Promise.resolve(result));
    expect(
      await userController.create({
        name: 'Yan Edwards',
        email: 'pajezinhofofinhokawway@gmail.com',
        password: '123456',
        address: 'Rua Madeira',
      }),
    ).toBe(result);
  });
});

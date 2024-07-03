import { Test } from '@nestjs/testing';

import { UserMock } from '@/features/user/services/factory/make.user.faker';
import { AuthService } from '../services/auth.service';
import { LoginController } from './auth.controller';

describe('User Controller', () => {
  let authController: LoginController;
  let authService: AuthService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            validateToken: jest.fn(),
            createToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<LoginController>(LoginController);
    authService = module.get<AuthService>(AuthService);
  });
  describe('[POST]/auth/login', () => {
    describe('Success', () => {
      it('should return a token for valid credentials', async () => {
        const userMock = UserMock.create({ name: 'Yan Edwards' });
        const token = 'token-generated';

        jest
          .spyOn(authService, 'validateUser')
          .mockResolvedValue({ user: userMock });

        jest.spyOn(authService, 'createToken').mockResolvedValue({
          access_token: token,
        });

        const result = await authController.login({
          email: userMock.email,
          password: userMock.password,
        });

        expect(result).toEqual({ access_token: token });
      });
    });
  });
});

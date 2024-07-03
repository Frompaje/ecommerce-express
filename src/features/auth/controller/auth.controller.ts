import { Body, ConflictException, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from '../dto/login-auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() body: AuthLoginDto) {
    const { user } = await this.authService.validateUser(body);
    const token = await this.authService.createToken(user);
    return token;
  }
}

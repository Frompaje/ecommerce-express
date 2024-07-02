import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from '../dto/login-auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() body: AuthLoginDto) {
    try {
      const { user } = await this.authService.validateUser(body);
      const token = await this.authService.createToken(user);
      return token;
    } catch (error) {
      console.log(error);
    }
  }
}

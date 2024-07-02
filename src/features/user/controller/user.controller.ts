import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './schema/create-user.dto';
import { CreateUserService } from '../services/create-user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateUserDto) {
    const { name, password, email, address } = body;

    return await this.userService.execute({
      name,
      password,
      email,
      address,
    });
  }
}

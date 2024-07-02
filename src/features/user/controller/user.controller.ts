import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user.service';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../decorator/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: CreateUserService) {}

  @Post()
  @Roles(Role.User)
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

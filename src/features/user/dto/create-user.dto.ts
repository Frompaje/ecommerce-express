import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3)
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  address: string;
}

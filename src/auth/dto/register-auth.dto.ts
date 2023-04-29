import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsAlphanumeric, IsNotEmpty, IsNumber } from 'class-validator';
export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNumber()
  birthday: string;

  @IsAlphanumeric()
  direction: string;
}

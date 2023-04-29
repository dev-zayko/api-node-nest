import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @MinLength(2)
  @MaxLength(100)
  email: string;

  @MinLength(4)
  @MaxLength(12)
  password: string;
}

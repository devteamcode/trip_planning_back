import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

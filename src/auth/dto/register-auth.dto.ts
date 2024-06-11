import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  active: boolean = true;
}

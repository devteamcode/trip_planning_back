import { Injectable } from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';

import { RegisterAuthDto, LoginAuthDto } from './dto';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginAuthDto: LoginAuthDto): Promise<User> {
    const { email, password } = loginAuthDto;
    return await this.userService.getUserByEmail(email);
  }

  async register(registerAuthDto: RegisterAuthDto): Promise<User> {
    return await this.userService.create(registerAuthDto);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserService } from 'src/users/user.service';

import { RegisterAuthDto, LoginAuthDto } from './dto';
import { IAuthResponse, IJwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<IAuthResponse> {
    const { email, password } = loginAuthDto;
    const user = await this.userService.getUserByEmail(email);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credentials are not valid (Password)');
    }

    delete user.password;

    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async register(registerAuthDto: RegisterAuthDto): Promise<IAuthResponse> {
    const { password, ...rest } = registerAuthDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      ...rest,
      password: hashedPassword,
    };
    const user = await this.userService.create(userData);
    delete user.password;

    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload);
  }
}

import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RegisterAuthDto } from 'src/auth/dto';

@Injectable()
export class UserService {
  async create(registerAuthDto: RegisterAuthDto): Promise<User> {
    return {
      id: 1,
      name: registerAuthDto.name,
      email: registerAuthDto.email,
      password: registerAuthDto.password,
    };
  }

  async getUserByEmail(email: string): Promise<User> {
    return {
      id: 1,
      name: 'test',
      email,
      password: 'test',
    };
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<User> {
    //todo: add soft delete
    throw new Error('Method not implemented.');
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterAuthDto } from 'src/auth/dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(registerAuthDto: RegisterAuthDto): Promise<User> {
    try {
      return await this.userRepository.save(registerAuthDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail.replace(/Key \(.*?\)=/, ''));
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, active: true },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        active: true,
      },
    });

    if (!user)
      throw new NotFoundException(
        `User with email ${email} not found. Consult with an administrator.`,
      );
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ where: { active: true } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, active: true },
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<boolean> {
    const resp = await this.userRepository.update({ id }, { active: false });
    if (!resp.affected)
      throw new NotFoundException(`User with id ${id} not found`);
    return true;
  }
}

import { Module } from '@nestjs/common';

import { UserModule } from 'src/users/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { envs } from 'src/config';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: envs.jwtSecret,
        signOptions: {
          expiresIn: `${envs.jwtExpires}h`,
        },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

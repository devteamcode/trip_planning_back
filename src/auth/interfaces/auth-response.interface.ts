import { User } from 'src/users/entities/user.entity';

export interface IAuthResponse {
  user: User;
  token: string;
}

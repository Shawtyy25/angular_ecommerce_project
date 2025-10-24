import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  constructor(private usersService: UsersService) {}

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByNameOrEmail(username);

    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }
}

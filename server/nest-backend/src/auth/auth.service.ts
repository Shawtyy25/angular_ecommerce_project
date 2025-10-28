import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from '../main/user/user.service';
import { User } from '../main/user/entities/user.entity';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  constructor(private usersService: UserService) {}

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByNameOrEmail(username);

    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }
}

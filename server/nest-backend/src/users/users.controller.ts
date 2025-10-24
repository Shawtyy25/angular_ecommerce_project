import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  private loggedInUser: User | null = null;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user: User | null = await this.authService.login(
      body.username,
      body.password,
    );
    if (!user) return { error: 'INVALID CREDENTIALS' };

    this.loggedInUser = user;
    return [{ message: 'LOGIN SUCCESSFUL' }, { user: this.loggedInUser }];
  }

  @Post('logout')
  logout() {
    this.loggedInUser = null;
    return { message: 'Logged out successfully!' };
  }

  @Get('current')
  currentUser() {
    return [this.loggedInUser, 1];
  }
}

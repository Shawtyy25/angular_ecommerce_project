import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../../auth/auth.service';
import { User } from './entities/user.entity';

@Controller('api/user')
export class UserController {
  private loggedInUser: User | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
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

  @Get('count')
  async userCount() {
    return this.userService.userCount();
  }

  @Get('current')
  currentUser() {
    return [this.loggedInUser, 1];
  }
}

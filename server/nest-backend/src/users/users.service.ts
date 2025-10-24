import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { User } from './user.entity';
import dotenv from 'dotenv';

dotenv.config({ path: '../client.env' });

@Injectable()
export class UsersService{
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async findAll(): Promise<User[]> {
    const result = await this.client.query<User>('SELECT * FROM users');
    return result.rows;
  }

  async findByNameOrEmail(username: string): Promise<User | null> {
    const result = await this.client.query<User>(
      'SELECT * FROM users WHERE name = $1 OR email = $1',
      [username],
    );
    return result.rows[0] || null;
  }
}

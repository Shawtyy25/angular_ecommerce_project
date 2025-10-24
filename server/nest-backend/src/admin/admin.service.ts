import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AdminService {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async count(): Promise<number> {
    const res = await this.client.query<{ user_count: string }>(
      'SELECT COUNT(*) as user_count FROM users ',
    );

    return parseInt(res.rows[0].user_count, 10);
  }
}

import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UsersController],
  imports: [forwardRef(() => AuthModule), DatabaseModule],
  providers: [UsersService,],
  exports: [UsersService],
})
export class UsersModule {}

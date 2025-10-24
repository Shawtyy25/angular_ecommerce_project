import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import {UsersService} from "./users/users.service";
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [UsersModule, AuthModule, AdminModule, DatabaseModule, CategoriesModule, TypeOrmModule],
  exports: [TypeOrmModule],
  controllers: [AppController],
  providers: [AppService, UsersService]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './main/user/user.module';



@Module({
  imports: [AuthModule, AdminModule, DatabaseModule, TypeOrmModule, UserModule],
  exports: [TypeOrmModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

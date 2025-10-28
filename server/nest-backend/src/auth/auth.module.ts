import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../main/user/user.module';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [forwardRef(() => UserModule)],
})
export class AuthModule {}

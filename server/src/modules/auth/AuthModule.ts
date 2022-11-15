import { Module } from '@nestjs/common';
import { UserModule } from '../user/UserModule';
import { AuthController } from './AuthController';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}

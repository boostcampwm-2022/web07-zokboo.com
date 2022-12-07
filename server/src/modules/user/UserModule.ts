import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';
import { UserController } from './UserController';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}

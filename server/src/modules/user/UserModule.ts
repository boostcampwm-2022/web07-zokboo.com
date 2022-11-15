import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';

@Module({
  imports: [CommonModule],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}

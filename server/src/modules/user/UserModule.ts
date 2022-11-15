import { Module } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import { UserRepository } from './UserRepository';

@Module({
  imports: [PrismaInstance],
  providers: [UserRepository],
})
export class UserModule {}

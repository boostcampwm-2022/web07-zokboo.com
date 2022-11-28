import { Module } from '@nestjs/common';
import { PrismaInstance } from './PrismaInstance';
import { MailService } from './MailService';

@Module({
  exports: [PrismaInstance, MailService],
  providers: [PrismaInstance, MailService],
})
export class CommonModule {}

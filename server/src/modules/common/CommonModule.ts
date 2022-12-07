import { Module } from '@nestjs/common';
import { PrismaInstance } from './PrismaInstance';
import { MailService } from './MailService';
import { ImageUploader } from './ImageUploader';

@Module({
  exports: [PrismaInstance, MailService, ImageUploader],
  providers: [PrismaInstance, MailService, ImageUploader],
})
export class CommonModule {}

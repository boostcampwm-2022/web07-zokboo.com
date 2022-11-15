import { Module } from '@nestjs/common';
import { PrismaInstance } from './PrismaInstance';

@Module({
  exports: [PrismaInstance],
  providers: [PrismaInstance],
})
export class CommonModule {}

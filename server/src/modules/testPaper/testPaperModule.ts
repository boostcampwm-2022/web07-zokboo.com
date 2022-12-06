import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';

@Module({
  imports: [CommonModule],
})
export class testPaperModule {}

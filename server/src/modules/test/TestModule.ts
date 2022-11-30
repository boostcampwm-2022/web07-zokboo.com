import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { TestRepository } from './TestRepository';

@Module({
  imports: [CommonModule],
  providers: [TestRepository],
})
export class TestModule {}

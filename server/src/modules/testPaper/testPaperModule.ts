import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { TestModule } from '../test/TestModule';
import { TestPaperController } from './TestPaperController';
import { TestPaperRepository } from './TestPaperRepository';
import TestPaperService from './TestPaperService';

@Module({
  imports: [CommonModule, TestModule],
  controllers: [TestPaperController],
  providers: [TestPaperRepository, TestPaperService],
})
export class TestPaperModule {}

import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { WorkbookModule } from '../workbook/WorkbookModule';
import { TestController } from './TestController';
import { TestRepository } from './TestRepository';
import { TestService } from './TestService';

@Module({
  imports: [CommonModule, WorkbookModule],
  controllers: [TestController],
  providers: [TestRepository, TestService],
})
export class TestModule {}

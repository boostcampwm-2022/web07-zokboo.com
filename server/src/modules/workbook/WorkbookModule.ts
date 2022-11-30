import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { QuestionModule } from '../question/QuestionModule';
import { WorkbookController } from './WorkbookController';
import { WorkbookRepository } from './WorkbookRepository';
import { WorkbookService } from './WorkbookService';

@Module({
  imports: [CommonModule, QuestionModule],
  controllers: [WorkbookController],
  providers: [WorkbookRepository, WorkbookService],
  exports: [WorkbookRepository],
})
export class WorkbookModule {}

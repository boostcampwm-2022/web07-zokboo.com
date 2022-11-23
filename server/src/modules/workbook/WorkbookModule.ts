import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { WorkbookRepository } from './WorkbookRepository';
import { WorkbookService } from './WorkbookService';

@Module({
  imports: [CommonModule],
  providers: [WorkbookRepository, WorkbookService],
})
export class WorkbookModule {}

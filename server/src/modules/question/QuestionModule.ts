import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { QuestionRepository } from './QuestionRepository';
import { QuestionService } from './QuestionService';
import { QuestionController } from './QuestionController';

@Module({
  imports: [CommonModule],
  providers: [QuestionRepository, QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}

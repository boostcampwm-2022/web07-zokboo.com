import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { QuestionController } from './QuestionController';
import { QuestionRepository } from './QuestionRepository';
import { QuestionService } from './QuestionService';

@Module({
  imports: [CommonModule],
  controllers: [QuestionController],
  providers: [QuestionRepository, QuestionService],
})
export class QuestionModule {}

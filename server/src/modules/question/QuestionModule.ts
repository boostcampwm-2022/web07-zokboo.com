import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { QuestionRepository } from './QuestionRepository';

@Module({
  imports: [CommonModule],
  providers: [QuestionRepository],
})
export class QuestionModule {}

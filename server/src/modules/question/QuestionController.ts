import { Controller, Get, Query } from '@nestjs/common';
import { QuestionService } from './QuestionService';
import GetQuestionsQuery from './dto/query/GetQuestionsQuery';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get('/')
  getQuestions(@Query() query: GetQuestionsQuery) {
    console.log(query);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { QuestionService } from './QuestionService';
import GetQuestionsQuery from './dto/query/GetQuestionsQuery';
import ApiResponse from '../common/response/ApiResponse';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get('/')
  async getQuestions(@Query() query: GetQuestionsQuery) {
    // TODO: 머지된 부분에서 User Decorator 사용하기
    const id = BigInt(100000000);
    const response = await this.questionService.getQuestions(query, id);

    return new ApiResponse('조회 완료', response);
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateQuestionRequest from './dto/request/CreateQuestionRequest';
import { QuestionService } from './QuestionService';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createQuestion(@User('id') userId: string, @Body() request: CreateQuestionRequest) {
    const response = await this.questionService.createQuestion(request, Number(userId));
    return new ApiResponse('문제 생성 완료', response);
  }
}

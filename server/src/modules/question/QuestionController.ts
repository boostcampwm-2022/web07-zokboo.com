import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateQuestionRequest from './dto/request/CreateQuestionRequest';
import { QuestionService } from './QuestionService';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createQuestion(@Req() req: Request, @Body() request: CreateQuestionRequest) {
    const { user } = req;
    const response = await this.questionService.createQuestion(request, Number(user.id));
    return new ApiResponse('문제 생성 완료', response);
  }
}

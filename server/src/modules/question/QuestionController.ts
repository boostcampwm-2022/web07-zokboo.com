import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateQuestionRequest from './dto/request/CreateQuestionRequest';
import CreateQuestionResponse from './dto/response/CreateQuestionResponse';
import GetQuestionsQuery from './dto/query/GetQuestionsQuery';
import GetQuestionsResponse from './dto/response/GetQuestionsResponse';
import { QuestionService } from './QuestionService';

@Controller('questions')
@ApiExtraModels(ApiResponse, CreateQuestionResponse)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @Api200Response(GetQuestionsResponse, '문제 조회 완료')
  async getQuestions(@User('id') id: bigint, @Query() query: GetQuestionsQuery) {
    const response = await this.questionService.getQuestions(query, id);

    return new ApiResponse('조회 완료', response);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, CreateQuestionResponse, '문제 생성 완료')
  async createQuestion(@User('id') userId: string, @Body() request: CreateQuestionRequest) {
    const response = await this.questionService.createQuestion(request, Number(userId));
    return new ApiResponse('문제 생성 완료', response);
  }
}

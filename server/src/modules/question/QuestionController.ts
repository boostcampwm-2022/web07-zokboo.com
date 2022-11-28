import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateQuestionRequest from './dto/request/CreateQuestionRequest';
import CreateQuestionResponse from './dto/response/CreateQuestionResponse';
import { QuestionService } from './QuestionService';

@Controller('questions')
@ApiExtraModels(ApiResponse, CreateQuestionResponse)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, CreateQuestionResponse, '문제 생성 완료')
  async createQuestion(@User('id') userId: string, @Body() request: CreateQuestionRequest) {
    const response = await this.questionService.createQuestion(request, Number(userId));
    return new ApiResponse('문제 생성 완료', response);
  }
}

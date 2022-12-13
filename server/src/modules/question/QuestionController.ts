import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { ApiMultiResponse, ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';
import { User } from '../../decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateQuestionRequest from './dto/request/CreateQuestionRequest';
import CreateQuestionResponse from './dto/response/CreateQuestionResponse';
import GetQuestionsQuery from './dto/query/GetQuestionsQuery';
import GetQuestionsResponse from './dto/response/GetQuestionsResponse';
import { QuestionService } from './QuestionService';
import { FilesInterceptor } from '@nestjs/platform-express';
import LikeQuestionResponse from './dto/response/LikeQuestionResponse';

@Controller('questions')
@ApiExtraModels(ApiResponse, CreateQuestionResponse, GetQuestionsResponse)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'text',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'hashtag',
    type: String,
    required: false,
  })
  @ApiMultiResponse(200, GetQuestionsResponse, '문제 조회 성공')
  async getQuestions(@User('id') id: string, @Query() query: GetQuestionsQuery) {
    const response = await this.questionService.getQuestions(query, Number(id));
    console.log(response);
    return new ApiResponse('조회 성공', response);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @ApiSingleResponse(201, CreateQuestionResponse, '문제 생성 완료')
  async createQuestion(
    @User('id') userId: string,
    @Body() request: CreateQuestionRequest,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    request.images = images;
    const response = await this.questionService.createQuestion(request, Number(userId));
    return new ApiResponse('문제 생성 성공', response);
  }

  @Post('like/:questionId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSingleResponse(200, LikeQuestionResponse, '좋아요 완료')
  async like(@User('id') userId: string, @Param('questionId') questionId: number) {
    const response = await this.questionService.like(questionId, Number(userId));

    return new ApiResponse('좋아요 성공', response);
  }

  @Post('dislike/:questionId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSingleResponse(200, LikeQuestionResponse, '좋아요 취소 완료')
  async dislike(@User('id') userId: string, @Param('questionId') questionId: number) {
    const response = await this.questionService.dislike(questionId, Number(userId));

    return new ApiResponse('좋아요 취소 성공', response);
  }
}

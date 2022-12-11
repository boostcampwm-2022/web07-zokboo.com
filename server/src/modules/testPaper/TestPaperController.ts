import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateTestPaperRequest from './dto/request/CreateTestPaperRequest';
import CreateTestPaperResponse from './dto/response/CreateTestPageResponse';
import TestPaperDetailResponse from './dto/response/TestPaperSimpleResponse';
import TestPaperQuestionSimpleResponse from './dto/response/TestPaperQuestionSimpleResponse';
import { TestPaperService } from './TestPaperService';
import TestPaperGradedResponse from './dto/response/TestPaperGradedResponse';
import GradeTestPaperRequest from './dto/request/GradeTestPaperRequest';
import GradeTestPaperQuestionRequest from './dto/request/GradeTestPaperQuestionRequest';
import TestPaperQuestionDetailResponse from './dto/response/TestPaperQuestionDetailResponse';
import MarkTestPaperRequest from './dto/request/MarkTestPaperRequest';
import MarkTestPaperQuestionRequest from './dto/request/MarkTestPaperQuestionRequest';

@Controller('testpaper')
@ApiExtraModels(
  CreateTestPaperResponse,
  TestPaperDetailResponse,
  TestPaperQuestionSimpleResponse,
  TestPaperQuestionDetailResponse,
  TestPaperGradedResponse,
  GradeTestPaperQuestionRequest,
  MarkTestPaperQuestionRequest,
)
export class TestPaperController {
  constructor(private readonly testPaperService: TestPaperService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, CreateTestPaperResponse, '시험지 생성 성공')
  async createTestPaper(@User('id') userId: string, @Body() request: CreateTestPaperRequest) {
    const response = await this.testPaperService.createTestPaper(request, Number(userId));
    return new ApiResponse('시험지 생성 성공', response);
  }

  @Get(':testPaperId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, TestPaperDetailResponse, '시험지 상세 조회 성공')
  async showTestPaperWithDetails(@User('id') userId: string, @Param('testPaperId', ParseIntPipe) testPaperId: number) {
    const response = await this.testPaperService.getTestPaperWithDetails(Number(userId), testPaperId);
    return new ApiResponse('시험지 상세 조회 성공', response);
  }

  @Put(':testPaperId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, TestPaperGradedResponse, '시험지 객관식 문제 채점 성공')
  async gradeMultipleTypeQuestionsOfTestPaper(
    @User('id') userId: string,
    @Param('testpaperId', ParseIntPipe) testPaperId: number,
    @Body() request: GradeTestPaperRequest,
  ) {
    const response = await this.testPaperService.gradeMultipleTypeQuestionsOfTestPaper(
      Number(userId),
      testPaperId,
      request,
    );
    return new ApiResponse('시험지 객관식 문제 채점 성공', response);
  }

  @Patch(':testPaperId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, TestPaperGradedResponse, '시험지 주관식 문제 채점 성공')
  async markSubjectiveTypeQuestionsOfTestPaper(
    @User('id') userId: string,
    @Param('testPaperId', ParseIntPipe) testPaperId: number,
    @Body() request: MarkTestPaperRequest,
  ) {
    const response = await this.testPaperService.markSubjectiveTypeQuestionsOfTestPaper(
      Number(userId),
      testPaperId,
      request,
    );
    return new ApiResponse('시험지 객관식 문제 채점 성공', response);
  }
}

import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { ApiMultiResponse, ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateTestPaperRequest from './dto/request/CreateTestPaperRequest';
import CreateTestPaperResponse from './dto/response/CreateTestPageResponse';
import TestPaperDetailResponse from './dto/response/TestPaperDetailResponse';
import TestPaperQuestionSimpleResponse from './dto/response/TestPaperQuestionSimpleResponse';
import { TestPaperService } from './TestPaperService';
import TestPaperGradedResponse from './dto/response/TestPaperGradedResponse';
import GradeTestPaperRequest from './dto/request/GradeTestPaperRequest';
import GradeTestPaperQuestionRequest from './dto/request/GradeTestPaperQuestionRequest';
import TestPaperQuestionDetailResponse from './dto/response/TestPaperQuestionDetailResponse';
import MarkTestPaperRequest from './dto/request/MarkTestPaperRequest';
import MarkTestPaperQuestionRequest from './dto/request/MarkTestPaperQuestionRequest';
import TestPaperSimpleResponse from './dto/response/TestPaperSimpleResponse';
import TestPaperState from './enum/TestPaperState';
import ReviewQuestionResponse from './dto/response/ReviewQuestionResponse';
import ReviewQuestionRequest from './dto/request/ReviewQuestionRequest';

@Controller('testpapers')
@ApiExtraModels(
  CreateTestPaperResponse,
  TestPaperDetailResponse,
  TestPaperQuestionSimpleResponse,
  TestPaperQuestionDetailResponse,
  TestPaperGradedResponse,
  GradeTestPaperQuestionRequest,
  MarkTestPaperQuestionRequest,
  TestPaperSimpleResponse,
)
export class TestPaperController {
  constructor(private readonly testPaperService: TestPaperService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, CreateTestPaperResponse, '????????? ?????? ??????')
  async createTestPaper(@User('id') userId: string, @Body() request: CreateTestPaperRequest) {
    const response = await this.testPaperService.createTestPaper(request, Number(userId));
    return new ApiResponse('????????? ?????? ??????', response);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'state',
    enum: TestPaperState,
    required: false,
  })
  @ApiMultiResponse(200, TestPaperSimpleResponse, '????????? ????????? ?????? ??????')
  async showTestPapers(@User('id') userId: string, @Query('state') state?: TestPaperState) {
    const response = await this.testPaperService.getTestPapersOfUserByState(
      Number(userId),
      state ? state : TestPaperState.SOLVING,
    );
    return new ApiResponse('????????? ????????? ?????? ??????', response);
  }

  @Get(':testPaperId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, TestPaperDetailResponse, '????????? ?????? ?????? ??????')
  async showTestPaperWithDetails(@User('id') userId: string, @Param('testPaperId', ParseIntPipe) testPaperId: number) {
    const response = await this.testPaperService.getTestPaperWithDetails(Number(userId), testPaperId);
    return new ApiResponse('????????? ?????? ?????? ??????', response);
  }

  @Put(':testPaperId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, TestPaperGradedResponse, '????????? ????????? ?????? ?????? ??????')
  async gradeMultipleTypeQuestionsOfTestPaper(
    @User('id') userId: string,
    @Param('testPaperId', ParseIntPipe) testPaperId: number,
    @Body() request: GradeTestPaperRequest,
  ) {
    const response = await this.testPaperService.gradeMultipleTypeQuestionsOfTestPaper(
      Number(userId),
      testPaperId,
      request,
    );
    return new ApiResponse('????????? ????????? ?????? ?????? ??????', response);
  }

  @Patch(':testPaperId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, TestPaperGradedResponse, '????????? ????????? ?????? ?????? ??????')
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
    return new ApiResponse('????????? ????????? ?????? ?????? ??????', response);
  }

  @Patch(':testPaperQuestionId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, ReviewQuestionResponse, '????????? ?????? ???????????? ?????? ??????')
  async reviewTestPaperQuestion(
    @User('id') userId: string,
    @Param('testPaperQuestionId', ParseIntPipe) testPaperQuestionId: number,
    @Body() request: ReviewQuestionRequest,
  ) {
    const response = await this.testPaperService.reviewTestPaperQuestion(Number(userId), testPaperQuestionId, request);
    return new ApiResponse('????????? ?????? ???????????? ?????? ??????', response);
  }
}

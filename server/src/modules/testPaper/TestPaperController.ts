import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateTestPaperRequest from './dto/request/CreateTestPaperRequest';
import CreateTestPaperResponse from './dto/response/CreateTestPageResponse';
import TestPaperDetailResponse from './dto/response/TestPaperDetailResponse';
import TestPaperQuestionSimpleResponse from './dto/response/TestPaperQuestionSimpleResponse';
import { TestPaperService } from './TestPaperService';

@Controller('testpaper')
@ApiExtraModels(CreateTestPaperResponse, TestPaperDetailResponse, TestPaperQuestionSimpleResponse)
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
}

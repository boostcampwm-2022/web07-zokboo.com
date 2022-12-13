import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { ApiMultiResponse, ApiSingleResponse } from '../../decorators/ApiResponseDecorator';
import { User } from '../../decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateTestRequest from './dto/request/CreateTestRequest';
import CreateWorkbookTestRequest from './dto/request/CreateWorkbookTestRequest';
import TestSimpleResponse from './dto/response/TestSimpleResponse';
import WorkbookTestSimpleResponse from './dto/response/WorkbookTestSimpleResponse';
import { TestService } from './TestService';

@Controller('api/tests')
@ApiExtraModels(CreateWorkbookTestRequest, TestSimpleResponse, WorkbookTestSimpleResponse)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, TestSimpleResponse, '시험 생성 성공')
  async createTest(@User('id') userId: string, @Body() request: CreateTestRequest) {
    const response = await this.testService.createTest(request, Number(userId));
    return new ApiResponse('시험 생성 성공', response);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'title',
    type: String,
    required: false,
  })
  @ApiMultiResponse(200, TestSimpleResponse, '내 시험 조회 / 검색 성공')
  async searchMyTest(@User('id') userId: string, @Query('title') title?: string) {
    const response = await this.testService.searchTestsByUser(title, Number(userId));
    return new ApiResponse('내 시험 조회 / 검색 성공', response);
  }
}

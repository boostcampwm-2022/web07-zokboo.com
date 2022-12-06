import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateTestRequest from './dto/request/CreateTestRequest';
import CreateWorkbookTestRequest from './dto/request/CreateWorkbookTestRequest';
import TestSimpleResponse from './dto/response/TestSimpleResponse';
import WorkbookTestSimpleResponse from './dto/response/WorkbookTestSimpleResponse';
import { TestService } from './TestService';

@Controller('tests')
@ApiExtraModels(CreateWorkbookTestRequest, TestSimpleResponse, WorkbookTestSimpleResponse)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, TestSimpleResponse, '시험 생성 완료')
  async createTest(@User('id') userId: string, @Body() request: CreateTestRequest) {
    const response = await this.testService.createTest(request, Number(userId));
    return new ApiResponse('시험 생성 완료', response);
  }
}

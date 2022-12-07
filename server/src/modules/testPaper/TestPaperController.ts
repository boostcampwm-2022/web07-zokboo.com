import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateTestPaperRequest from './dto/request/CreateTestPaperRequest';
import TestPaperService from './TestPaperService';

@Controller('testpaper')
export class TestPaperController {
  constructor(private readonly testPaperService: TestPaperService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTestPaper(@User('id') userId: string, @Body() request: CreateTestPaperRequest) {
    const response = await this.testPaperService.createTestPaper(request, Number(userId));
    return new ApiResponse('시험지 생성 성공', response);
  }
}

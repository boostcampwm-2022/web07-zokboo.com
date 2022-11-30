import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateTestRequest from './dto/request/CreateTestRequest';
import { TestService } from './TestService';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTest(@User('id') userId, @Body() request: CreateTestRequest) {
    const response = await this.testService.createTest(request, Number(userId));
    return new ApiResponse('시험 생성 완료', response);
  }
}

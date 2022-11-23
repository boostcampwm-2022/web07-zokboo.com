import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateWorkbookRequest from './dto/request/CreateWorkbookRequest';
import { WorkbookService } from './WorkbookService';

@Controller('workbooks')
export class WorkbookController {
  constructor(private readonly workbookService: WorkbookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createWorkbook(@User('id') userId: string, @Body() request: CreateWorkbookRequest) {
    const response = await this.workbookService.createWorkbook(request, Number(userId));
    return new ApiResponse('문제집 제작 성공', response);
  }
}

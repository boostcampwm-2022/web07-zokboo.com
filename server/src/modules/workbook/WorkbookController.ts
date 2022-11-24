import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { Api200Response, Api201Response } from 'src/decorators/ApiResponseDecorator';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateWorkbookRequest from './dto/request/CreateWorkbookRequest';
import CreateWorkbookResponse from './dto/response/CreateWorkbookResponse';
import { WorkbookService } from './WorkbookService';
import SaveWorkbookToListRequest from './dto/request/SaveWorkbookToListRequest';
import SaveWorkbookToListResponse from './dto/response/SaveWorkbookToListResponse';

@Controller('workbooks')
@ApiExtraModels(ApiResponse, CreateWorkbookResponse, SaveWorkbookToListResponse)
export class WorkbookController {
  constructor(private readonly workbookService: WorkbookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Api201Response(CreateWorkbookResponse, '문제집 제작 성공')
  async createWorkbook(@User('id') userId: string, @Body() request: CreateWorkbookRequest) {
    const response = await this.workbookService.createWorkbook(request, Number(userId));
    return new ApiResponse('문제집 제작 성공', response);
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  @Api200Response(SaveWorkbookToListResponse, '문제집 저장 성공')
  async saveWorkbookToList(@User('id') userId: string, @Body() request: SaveWorkbookToListRequest) {
    const response = await this.workbookService.saveWorkbookToList(request, userId);

    return new ApiResponse('문제집 저장 성공', response);
  }
}

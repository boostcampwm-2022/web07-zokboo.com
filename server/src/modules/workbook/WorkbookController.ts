import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { ApiMultiResponse, ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateWorkbookRequest from './dto/request/CreateWorkbookRequest';
import CreateWorkbookResponse from './dto/response/CreateWorkbookResponse';
import QuestionDetailResponse from './dto/response/QuestionDetailResponse';
import WorkbookDetailResponse from './dto/response/WorkbookDetailResponse';
import WorkbookSimpleResponse from './dto/response/WorkbookSimpleResponse';
import { WorkbookService } from './WorkbookService';

@Controller('workbooks')
@ApiExtraModels(
  ApiResponse,
  CreateWorkbookResponse,
  WorkbookDetailResponse,
  QuestionDetailResponse,
  WorkbookSimpleResponse,
)
export class WorkbookController {
  constructor(private readonly workbookService: WorkbookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, CreateWorkbookResponse, '문제집 제작 성공')
  async createWorkbook(@User('id') userId: string, @Body() request: CreateWorkbookRequest) {
    const response = await this.workbookService.createWorkbook(request, Number(userId));
    return new ApiResponse('문제집 제작 성공', response);
  }

  @Get('search')
  @ApiQuery({
    name: 'title',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'content',
    type: String,
    required: false,
  })
  @ApiMultiResponse(200, WorkbookSimpleResponse, '문제집 검색 성공')
  async searchWorkbooks(@Query('title') title?: string, @Query('content') content?: string) {
    const response = await this.workbookService.searchWorkbooks(title, content);
    return new ApiResponse('문제집 검색 성공', response);
  }

  @Get(':workbookId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, WorkbookDetailResponse, '문제집 조회 성공')
  async showWorkbook(@User('id') userId: string, @Param('workbookId', ParseIntPipe) workbookId: number) {
    const response = await this.workbookService.getWorkbook(workbookId, Number(userId));
    return new ApiResponse('문제집 조회 성공', response);
  }

  @Post(':workbookId/save')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, CreateWorkbookResponse, '문제집 저장 성공')
  async saveWorkbookToList(@User('id') userId: string, @Param('workbookId', ParseIntPipe) workbookId: number) {
    const response = await this.workbookService.duplicateWorkbook(workbookId, Number(userId));

    return new ApiResponse('문제집 저장 성공', response);
  }
}

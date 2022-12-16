import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { ApiMultiResponse, ApiSingleResponse } from '../../decorators/ApiResponseDecorator';
import { User } from '../../decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import ApiResponse from '../common/response/ApiResponse';
import CreateWorkbookRequest from './dto/request/CreateWorkbookRequest';
import SolveWorkbookQuestionRequest from './dto/request/SolveWorkbookQuestionRequest';
import CreateWorkbookResponse from './dto/response/CreateWorkbookResponse';
import QuestionDetailResponse from '../question/dto/response/QuestionDetailResponse';
import WorkbookDetailResponse from './dto/response/WorkbookDetailResponse';
import WorkbookSimpleResponse from './dto/response/WorkbookSimpleResponse';
import WorkbookStateResponse from './dto/response/WorkbookStateResponse';
import { WorkbookService } from './WorkbookService';
import WorkbookQuestionSimpleResponse from './dto/response/WorkbookQuestionSimpleResponse';
import WorkbookQuestionDetailResponse from './dto/response/WorkbookQuestionDetailResponse';
import WorkbookSearchResponse from './dto/response/WorkbookSearchResponse';
import LikeWorkbookResponse from './dto/response/LikeWorkbookResponse';

@Controller('workbooks')
@ApiExtraModels(
  ApiResponse,
  CreateWorkbookResponse,
  WorkbookDetailResponse,
  QuestionDetailResponse,
  WorkbookSimpleResponse,
  WorkbookQuestionSimpleResponse,
  WorkbookQuestionDetailResponse,
  WorkbookStateResponse,
  WorkbookSearchResponse,
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

  @Get()
  @UseGuards(JwtAuthGuard)
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
  @ApiMultiResponse(200, WorkbookSearchResponse, '문제집 조회 / 검색 성공')
  async searchWorkbooks(
    @User('id') userId: string,
    @Query('title') title?: string,
    @Query('content') content?: string,
  ) {
    const response = await this.workbookService.searchWorkbooks(Number(userId), title, content);
    return new ApiResponse('문제집 조회 / 검색 성공', response);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
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
  @ApiMultiResponse(200, WorkbookDetailResponse, '내 문제집 조회 / 검색 성공')
  async searchMyWorkbooks(
    @User('id') userId: string,
    @Query('title') title?: string,
    @Query('content') content?: string,
  ) {
    const response = await this.workbookService.searchWorkbooksByUser(title, content, Number(userId));
    return new ApiResponse('내 문제집 조회 / 검색 성공', response);
  }

  @Get('saved')
  @UseGuards(JwtAuthGuard)
  @ApiMultiResponse(200, WorkbookSimpleResponse, '공유받은 문제집 조회 성공')
  async getSavedWorkbooks(@User('id') userId: string) {
    const response = await this.workbookService.getSavedWorkbooks(Number(userId));

    return new ApiResponse('공유받은 문제집 조회 성공', response);
  }

  @Get(':workbookId')
  @ApiSingleResponse(200, WorkbookDetailResponse, '문제집 상세 조회 성공')
  async showWorkbook(@Param('workbookId', ParseIntPipe) workbookId: number) {
    const response = await this.workbookService.getWorkbook(workbookId);
    return new ApiResponse('문제집 상세 조회 성공', response);
  }

  @Get(':workbookId/questions')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, WorkbookStateResponse, '문제집 풀이용 조회 성공')
  async showWorkbookToSolve(@User('id') userId: string, @Param('workbookId', ParseIntPipe) workbookId: number) {
    const response = await this.workbookService.getWorkbookToSolve(workbookId, Number(userId));
    return new ApiResponse('문제집 풀이용 조회 성공', response);
  }

  @Patch(':workbookId/:workbookQuestionId')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, WorkbookQuestionSimpleResponse, '문제집 풀이 성공')
  async solveWorkbookQuestion(
    @User('id') userId: string,
    @Param('workbookId', ParseIntPipe) workbookId: number,
    @Param('workbookQuestionId', ParseIntPipe) workbookQuestionId: number,
    @Body() request: SolveWorkbookQuestionRequest,
  ) {
    const response = await this.workbookService.solveWorkbookQuestion(
      workbookId,
      workbookQuestionId,
      request,
      Number(userId),
    );
    return new ApiResponse('문제집 풀이 성공', response);
  }

  @Post(':workbookId/save')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(201, CreateWorkbookResponse, '문제집 저장 성공')
  async saveWorkbookToList(@User('id') userId: string, @Param('workbookId', ParseIntPipe) workbookId: number) {
    const response = await this.workbookService.duplicateWorkbook(workbookId, Number(userId));

    return new ApiResponse('문제집 저장 성공', response);
  }

  @Post(':workbookId/like')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSingleResponse(200, LikeWorkbookResponse, '문제집 좋아요 성공')
  async likeWorkbook(@User('id') userId: string, @Param('workbookId', ParseIntPipe) workbookId: number) {
    const response = await this.workbookService.likeWorkbook(workbookId, Number(userId));

    return new ApiResponse('문제집 좋아요 성공', response);
  }

  @Post(':workbookId/dislike')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiSingleResponse(200, LikeWorkbookResponse, '문제집 좋아요 취소 성공')
  async dislikeWorkbook(@User('id') userId: string, @Param('workbookId', ParseIntPipe) workbookId: number) {
    const response = await this.workbookService.dislikeWorkbook(workbookId, Number(userId));

    return new ApiResponse('문제집 좋아요 취소 성공', response);
  }
}

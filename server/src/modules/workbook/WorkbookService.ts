import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import { QuestionRepository } from '../question/QuestionRepository';
import Workbook from './domain/Workbook';
import WorkbookQuestion from './domain/WorkbookQuestion';
import CreateWorkbookRequest from './dto/request/CreateWorkbookRequest';
import SolveWorkbookQuestionRequest from './dto/request/SolveWorkbookQuestionRequest';
import CreateWorkbookResponse from './dto/response/CreateWorkbookResponse';
import WorkbookDetailResponse from './dto/response/WorkbookDetailResponse';
import WorkbookQuestionSimpleResponse from './dto/response/WorkbookQuestionSimpleResponse';
import WorkbookSearchResponse from './dto/response/WorkbookSearchResponse';
import WorkbookSimpleResponse from './dto/response/WorkbookSimpleResponse';
import WorkbookStateResponse from './dto/response/WorkbookStateResponse';
import { WorkbookRepository } from './WorkbookRepository';
import LikeWorkbookResponse from './dto/response/LikeWorkbookResponse';
import WorkbookLike from './domain/WorkbookLike';

@Injectable()
export class WorkbookService {
  constructor(
    private readonly workbookRepository: WorkbookRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly prisma: PrismaInstance,
  ) {}

  async createWorkbook(request: CreateWorkbookRequest, userId: number) {
    let result: CreateWorkbookResponse;
    await this.prisma.$transaction(async (tx) => {
      const workbook = Workbook.new(request.title, request.description, request.isPublic, userId);
      const questions = await this.questionRepository.findQuestionsByIds(request.questions, tx);
      workbook.setQuestions(questions.map((question) => WorkbookQuestion.new(undefined, question)));
      await this.workbookRepository.save(workbook, tx);
      result = new CreateWorkbookResponse(workbook);
    });
    return result;
  }

  async searchWorkbooks(userId: number, title: string, content: string) {
    const workbooks = await this.workbookRepository.searchWorkbooks(title, content);
    const likes = await this.workbookRepository.mapLikeByWorkbookIds(
      BigInt(userId),
      workbooks.map((workbook) => workbook.workbookId),
    );
    return workbooks.map((w, idx) => new WorkbookSearchResponse(w, likes[idx]));
  }

  async searchWorkbooksByUser(title: string, content: string, userId: number) {
    const workbooks = await this.workbookRepository.searchWorkbooksByUser(title, content, userId);
    return workbooks.map((w) => new WorkbookDetailResponse(w));
  }

  async getWorkbook(workbookId: number) {
    const workbook = await this.workbookRepository.findWorkbook(workbookId);
    if (!workbook || !workbook.isPublic) {
      throw new BadRequestException('????????? ????????? ID ?????????.');
    }
    return new WorkbookDetailResponse(workbook);
  }

  async getWorkbookToSolve(workbookId: number, userId: number) {
    const workbook = await this.workbookRepository.findWorkbook(workbookId);
    if (!workbook || workbook.userId !== BigInt(userId)) {
      throw new BadRequestException('????????? ????????? ID ?????????.');
    }
    return new WorkbookStateResponse(workbook);
  }

  async getSavedWorkbooks(userId: number) {
    const result = await this.workbookRepository.findSavedWorkbooks(userId);

    return result.map((workbook) => new WorkbookSimpleResponse(workbook));
  }

  async solveWorkbookQuestion(
    workbookId: number,
    workbookQuestionId: number,
    request: SolveWorkbookQuestionRequest,
    userId: number,
  ) {
    let result: WorkbookQuestionSimpleResponse;
    await this.prisma.$transaction(async (tx) => {
      const workbook = await this.workbookRepository.findOnlyWorkbook(workbookId, tx);
      if (!workbook || workbook.userId !== BigInt(userId)) {
        throw new BadRequestException('????????? ????????? ID ?????????.');
      }
      const workbookQuestion = await this.workbookRepository.findWorkbookQuestion(workbookQuestionId, tx);
      if (!workbookQuestion || workbookQuestion.workbookId !== BigInt(workbookId)) {
        throw new BadRequestException('?????? ???????????? ???????????? ?????? ???????????????.');
      }
      workbookQuestion.solve(request.newAnswer);
      await this.workbookRepository.updateWorkbookQuestion(workbookQuestion, tx);
      result = new WorkbookQuestionSimpleResponse(workbookQuestion);
    });
    return result;
  }

  async duplicateWorkbook(workbookId: number, userId: number) {
    let result: CreateWorkbookResponse;
    await this.prisma.$transaction(async (tx) => {
      const workbook = await this.workbookRepository.findWorkbook(workbookId, tx);
      const newWorkbook = Workbook.duplicate(workbook, userId);
      newWorkbook.setQuestions(
        workbook.questions.map((question) => WorkbookQuestion.new(workbook.workbookId, question.question)),
      );
      const savedResult = await this.workbookRepository.save(newWorkbook, tx);
      newWorkbook.setId(savedResult.workbookId);
      result = new CreateWorkbookResponse(newWorkbook);
    });
    return result;
  }

  async likeWorkbook(workbookId: number, userId: number) {
    let result: LikeWorkbookResponse;
    await this.prisma.$transaction(async (tx) => {
      const hasLiked = await this.workbookRepository.checkLiked(workbookId, userId, tx);

      if (hasLiked) {
        throw new BadRequestException('ALREADY_LIKED_WORKBOOK');
      }

      const newLike = new WorkbookLike(BigInt(workbookId), BigInt(userId));
      const likeResult = await this.workbookRepository.createWorkbookLike(newLike, tx);
      result = new LikeWorkbookResponse(likeResult);
    });

    return result;
  }

  async dislikeWorkbook(workbookId: number, userId: number) {
    let result: LikeWorkbookResponse;
    await this.prisma.$transaction(async (tx) => {
      const hasLiked = await this.workbookRepository.checkLiked(workbookId, userId, tx);

      if (!hasLiked) {
        throw new BadRequestException('NO_LIKE_FOUND');
      }
      const newDislike = new WorkbookLike(BigInt(workbookId), BigInt(userId));
      const dislikeResult = await this.workbookRepository.deleteWorkbookLike(newDislike, tx);

      if (dislikeResult !== 1) {
        throw new BadRequestException('DISLIKE_FAILED');
      }

      result = new LikeWorkbookResponse(newDislike);
    });

    return result;
  }
}

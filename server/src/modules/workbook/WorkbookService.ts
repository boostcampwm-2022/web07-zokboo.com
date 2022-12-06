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
import WorkbookSimpleResponse from './dto/response/WorkbookSimpleResponse';
import WorkbookStateResponse from './dto/response/WorkbookStateResponse';
import { WorkbookRepository } from './WorkbookRepository';

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

  async searchWorkbooks(title: string, content: string) {
    let result: WorkbookSimpleResponse[];
    await this.prisma.$transaction(async (tx) => {
      const workbooks = await this.workbookRepository.searchWorkbooks(title, content, tx);
      result = workbooks.map((w) => new WorkbookSimpleResponse(w));
    });
    return result;
  }

  async getWorkbook(workbookId: number) {
    let result: WorkbookDetailResponse;
    await this.prisma.$transaction(async (tx) => {
      const workbook = await this.workbookRepository.findWorkbook(workbookId, tx);
      if (!workbook || !workbook.isPublic) {
        throw new BadRequestException('잘못된 문제집 ID 입니다.');
      }
      result = new WorkbookDetailResponse(workbook);
    });
    return result;
  }

  async getWorkbookToSolve(workbookId: number, userId: number) {
    let result: WorkbookStateResponse;
    await this.prisma.$transaction(async (tx) => {
      const workbook = await this.workbookRepository.findWorkbook(workbookId, tx);
      if (!workbook || workbook.userId !== BigInt(userId)) {
        throw new BadRequestException('잘못된 문제집 ID 입니다.');
      }
      result = new WorkbookStateResponse(workbook);
    });
    return result;
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
        throw new BadRequestException('잘못된 문제집 ID 입니다.');
      }
      const workbookQuestion = await this.workbookRepository.findWorkbookQuestion(workbookQuestionId, tx);
      if (!workbookQuestion || workbookQuestion.workbookId !== BigInt(workbookId)) {
        throw new BadRequestException('해당 문제집에 존재하지 않는 문제입니다.');
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
}

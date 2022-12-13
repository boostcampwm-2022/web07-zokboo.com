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
    const workbooks = await this.workbookRepository.searchWorkbooks(title, content);
    return workbooks.map((w) => new WorkbookSimpleResponse(w));
  }

  async searchWorkbooksByUser(title: string, content: string, userId: number) {
    const workbooks = await this.workbookRepository.searchWorkbooksByUser(title, content, userId);
    return workbooks.map((w) => new WorkbookDetailResponse(w));
  }

  async getWorkbook(workbookId: number) {
    const workbook = await this.workbookRepository.findWorkbook(workbookId);
    if (!workbook || !workbook.isPublic) {
      throw new BadRequestException('잘못된 문제집 ID 입니다.');
    }
    return new WorkbookDetailResponse(workbook);
  }

  async getWorkbookToSolve(workbookId: number, userId: number) {
    const workbook = await this.workbookRepository.findWorkbook(workbookId);
    if (!workbook || workbook.userId !== BigInt(userId)) {
      throw new BadRequestException('잘못된 문제집 ID 입니다.');
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

import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionRepository } from '../question/QuestionRepository';
import Workbook from './domain/Workbook';
import WorkbookQuestion from './domain/WorkbookQuestion';
import CreateWorkbookRequest from './dto/request/CreateWorkbookRequest';
import SolveWorkbookQuestionRequest from './dto/request/SolveWorkbookQuestionRequest';
import CreateWorkbookResponse from './dto/response/CreateWorkbookResponse';
import WorkbookDetailResponse from './dto/response/WorkbookDetailResponse';
import WorkbookQuestionDetailResponse from './dto/response/WorkbookQuestionDetailResponse';
import WorkbookSimpleResponse from './dto/response/WorkbookSimpleResponse';
import WorkbookStateResponse from './dto/response/WorkbookStateResponse';
import { WorkbookRepository } from './WorkbookRepository';

@Injectable()
export class WorkbookService {
  constructor(
    private readonly workbookRepository: WorkbookRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async createWorkbook(request: CreateWorkbookRequest, userId: number) {
    const workbook = Workbook.new(request.title, request.description, request.isPublic, userId);
    const questions = await this.questionRepository.findQuestionsByIds(request.questions);
    workbook.setQuestions(questions.map((question) => WorkbookQuestion.new(undefined, question)));
    await this.workbookRepository.save(workbook);
    return new CreateWorkbookResponse(workbook);
  }

  async searchWorkbooks(title: string, content: string) {
    const workbooks = await this.workbookRepository.searchWorkbooks(title, content);
    return workbooks.map((w) => new WorkbookSimpleResponse(w));
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

  async solveWorkbookQuestion(
    workbookId: number,
    workbookQuestionId: number,
    request: SolveWorkbookQuestionRequest,
    userId: number,
  ) {
    const workbook = await this.workbookRepository.findOnlyWorkbook(workbookId);
    if (!workbook || workbook.userId !== BigInt(userId)) {
      throw new BadRequestException('잘못된 문제집 ID 입니다.');
    }
    const workbookQuestion = await this.workbookRepository.findWorkbookQuestion(workbookQuestionId);
    if (!workbookQuestion || workbookQuestion.workbookId !== BigInt(workbookId)) {
      throw new BadRequestException('해당 문제집에 존재하지 않는 문제입니다.');
    }
    workbookQuestion.solve(request.newAnswer);
    await this.workbookRepository.updateWorkbookQuestion(workbookQuestion);
    return new WorkbookQuestionDetailResponse(workbookQuestion);
  }

  async duplicateWorkbook(workbookId: number, userId: number) {
    const workbook = await this.workbookRepository.findWorkbook(workbookId);
    const newWorkbook = Workbook.duplicate(workbook, userId);
    newWorkbook.setQuestions(
      workbook.questions.map((question) => WorkbookQuestion.new(workbook.workbookId, question.question)),
    );
    const savedResult = await this.workbookRepository.save(newWorkbook);
    newWorkbook.setId(savedResult.workbookId);
    return new CreateWorkbookResponse(newWorkbook);
  }
}

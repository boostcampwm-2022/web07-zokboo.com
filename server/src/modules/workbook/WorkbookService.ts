import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionRepository } from '../question/QuestionRepository';
import Workbook from './domain/Workbook';
import WorkbookQuestion from './domain/WorkbookQuestion';
import CreateWorkbookRequest from './dto/request/CreateWorkbookRequest';
import CreateWorkbookResponse from './dto/response/CreateWorkbookResponse';
import WorkbookDetailResponse from './dto/response/WorkbookDetailResponse';
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

  async getWorkbook(workbookId: number, userId: number) {
    const workbook = await this.workbookRepository.findWorkbook(workbookId);
    if (!workbook || workbook.userId !== BigInt(userId)) {
      throw new BadRequestException('잘못된 문제집 ID 입니다.');
    }
    return new WorkbookDetailResponse(workbook);
  }
}

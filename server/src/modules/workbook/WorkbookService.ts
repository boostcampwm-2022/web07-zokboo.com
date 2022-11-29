import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionRepository } from '../question/QuestionRepository';
import Workbook from './domain/Workbook';
import WorkbookQuestion from './domain/WorkbookQuestion';
import CreateWorkbookRequest from './dto/request/CreateWorkbookRequest';
import CreateWorkbookResponse from './dto/response/CreateWorkbookResponse';
import { WorkbookRepository } from './WorkbookRepository';
import DuplicateWorkbookRequest from './dto/request/DuplicateWorkbookRequest';

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

  async duplicateWorkbook(request: DuplicateWorkbookRequest, userId: number) {
    const workbook = await this.workbookRepository.findWorkbookById(request.workbookId);
    const questions = await this.questionRepository.findQuestionsByIds(
      workbook.questions.map((q) => Number(q.question.questionId)),
    );

    if (!workbook.isPublic) {
      throw new BadRequestException('Private 문제집을 복사할 수 없습니다.');
    }

    const newWorkbook = Workbook.duplicate(workbook, workbook.originalId || workbook.workbookId, userId);
    newWorkbook.setQuestions(questions.map((question) => WorkbookQuestion.new(workbook.workbookId, question)));

    const savedResult = await this.workbookRepository.save(newWorkbook);

    newWorkbook.setId(savedResult.workbookId);

    return new CreateWorkbookResponse(newWorkbook);
  }
}

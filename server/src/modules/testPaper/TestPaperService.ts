import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import Question from '../question/domain/Question';
import { TestRepository } from '../test/TestRepository';
import Workbook from '../workbook/domain/Workbook';
import TestPaper from './domain/TestPaper';
import TestPaperQuestion from './domain/TestPaperQuestion';
import CreateTestPaperRequest from './dto/request/CreateTestPaperRequest';
import CreateTestPaperResponse from './dto/response/CreateTestPageResponse';
import TestPaperDetailResponse from './dto/response/TestPaperDetailResponse';
import { TestPaperRepository } from './TestPaperRepository';

@Injectable()
export class TestPaperService {
  constructor(
    private readonly prisma: PrismaInstance,
    private readonly testPaperRepository: TestPaperRepository,
    private readonly testRepository: TestRepository,
  ) {}

  async createTestPaper(request: CreateTestPaperRequest, userId: number) {
    let result: CreateTestPaperResponse;
    await this.prisma.$transaction(async (tx) => {
      const test = await this.testRepository.findTestWithAll(request.testId, tx);
      if (!test || test.userId !== BigInt(userId)) {
        throw new BadRequestException('잘못된 시험 ID 입니다.');
      }
      const testPaper = TestPaper.new(request.title, test);
      const questions: Question[] = [];
      test.workbooks.forEach((w) => {
        questions.push(...this.exportRandomQuestionsFromWorkbook(w.workbook, w.count));
      });
      testPaper.setQuestions(questions.map((q) => TestPaperQuestion.new(q)));
      await this.testPaperRepository.save(testPaper);
      result = new CreateTestPaperResponse(testPaper);
    });
    return result;
  }

  async getTestPaperWithDetails(userId: number, testPaperId: number) {
    const testPaper = await this.testPaperRepository.findTestPaperWithDetails(testPaperId);
    if (!testPaper || testPaper.test.userId !== BigInt(userId)) {
      throw new BadRequestException('잘못된 시험지 ID 입니다.');
    }
    return new TestPaperDetailResponse(testPaper);
  }

  private exportRandomQuestionsFromWorkbook(workbook: Workbook, count: number): Question[] {
    const size = workbook.questions.length;
    if (size < count) {
      throw new BadRequestException('요청 시험의 문제 수가 문제집의 문제 수보다 많습니다.');
    }
    const result: Question[] = [];
    const addedIndex = new Set<number>();
    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * size);
      if (addedIndex.has(randomIndex)) {
        continue;
      }
      result.push(workbook.questions[randomIndex].question);
      addedIndex.add(randomIndex);
    }
    return result;
  }
}
